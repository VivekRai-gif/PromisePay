import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('PromisePay Smart Contract', function () {
  let promisePay: any;
  let owner: any;
  let sender: any;
  let recipient: any;
  let stranger: any;

  beforeEach(async function () {
    [owner, sender, recipient, stranger] = await ethers.getSigners();

    const PromisePayFactory = await ethers.getContractFactory('PromisePay');
    promisePay = await PromisePayFactory.deploy();
    await promisePay.waitForDeployment();
  });

  describe('Deployment', function () {
    it('Should set owner as the verifier', async function () {
      expect(await promisePay.verifier()).to.equal(owner.address);
    });

    it('Should initialize promise count to 0', async function () {
      expect(await promisePay.getPromiseCount()).to.equal(0);
    });
  });

  describe('createPromise', function () {
    it('Should create a promise and lock native MON', async function () {
      const lockAmount = ethers.parseEther('1.0');
      const condition = '🎓 Graduation Degree Honors';

      await expect(
        promisePay.connect(sender).createPromise(recipient.address, condition, {
          value: lockAmount,
        })
      )
        .to.emit(promisePay, 'PromiseCreated')
        .withArgs(1, sender.address, recipient.address, lockAmount, condition);

      expect(await promisePay.getPromiseCount()).to.equal(1);

      const p = await promisePay.getPromise(1);
      expect(p.id).to.equal(1);
      expect(p.sender).to.equal(sender.address);
      expect(p.recipient).to.equal(recipient.address);
      expect(p.amount).to.equal(lockAmount);
      expect(p.condition).to.equal(condition);
      expect(p.status).to.equal(0); // LOCKED
    });

    it('Should fail if amount is 0', async function () {
      await expect(
        promisePay.connect(sender).createPromise(recipient.address, 'Graduation', {
          value: 0,
        })
      ).to.be.revertedWith('AMOUNT_MUST_BE_GREATER_THAN_ZERO');
    });

    it('Should fail if recipient is zero address', async function () {
      await expect(
        promisePay.connect(sender).createPromise(ethers.ZeroAddress, 'Graduation', {
          value: ethers.parseEther('1.0'),
        })
      ).to.be.revertedWith('INVALID_RECIPIENT_ADDRESS');
    });

    it('Should fail if condition string is empty', async function () {
      await expect(
        promisePay.connect(sender).createPromise(recipient.address, '', {
          value: ethers.parseEther('1.0'),
        })
      ).to.be.revertedWith('CONDITION_REQUIRED');
    });
  });

  describe('verifyPromise', function () {
    beforeEach(async function () {
      await promisePay.connect(sender).createPromise(recipient.address, '🎓 Graduation', {
        value: ethers.parseEther('2.0'),
      });
    });

    it('Should allow sender to verify promise', async function () {
      await expect(promisePay.connect(sender).verifyPromise(1))
        .to.emit(promisePay, 'PromiseVerified')
        .withArgs(1, sender.address);

      const p = await promisePay.getPromise(1);
      expect(p.status).to.equal(1); // VERIFIED
    });

    it('Should allow verifier (owner) to verify promise', async function () {
      await expect(promisePay.connect(owner).verifyPromise(1))
        .to.emit(promisePay, 'PromiseVerified')
        .withArgs(1, owner.address);

      const p = await promisePay.getPromise(1);
      expect(p.status).to.equal(1); // VERIFIED
    });

    it('Should fail if unauthorized stranger attempts to verify', async function () {
      await expect(promisePay.connect(stranger).verifyPromise(1)).to.be.revertedWith(
        'NOT_AUTHORIZED_VERIFIER'
      );
    });
  });

  describe('claim', function () {
    const lockAmount = ethers.parseEther('5.0');

    beforeEach(async function () {
      await promisePay.connect(sender).createPromise(recipient.address, '💼 Milestone V1', {
        value: lockAmount,
      });
    });

    it('Should fail if recipient attempts to claim before verification', async function () {
      await expect(promisePay.connect(recipient).claim(1)).to.be.revertedWith(
        'PROMISE_NOT_VERIFIED'
      );
    });

    it('Should allow recipient to claim funds after verification', async function () {
      await promisePay.connect(sender).verifyPromise(1);

      const recipientBalBefore = await ethers.provider.getBalance(recipient.address);

      const tx = await promisePay.connect(recipient).claim(1);
      const receipt = await tx.wait();
      const gasUsed = receipt.fee;

      const recipientBalAfter = await ethers.provider.getBalance(recipient.address);

      expect(recipientBalAfter).to.equal(recipientBalBefore + lockAmount - gasUsed);

      const p = await promisePay.getPromise(1);
      expect(p.status).to.equal(2); // CLAIMED
    });

    it('Should fail if non-recipient attempts to claim', async function () {
      await promisePay.connect(sender).verifyPromise(1);
      await expect(promisePay.connect(stranger).claim(1)).to.be.revertedWith(
        'ONLY_RECIPIENT_CAN_CLAIM'
      );
    });
  });

  describe('cancelPromise', function () {
    const lockAmount = ethers.parseEther('3.0');

    beforeEach(async function () {
      await promisePay.connect(sender).createPromise(recipient.address, '🏆 Hackathon Winner', {
        value: lockAmount,
      });
    });

    it('Should allow sender to cancel locked promise and receive refund', async function () {
      const senderBalBefore = await ethers.provider.getBalance(sender.address);

      const tx = await promisePay.connect(sender).cancelPromise(1);
      const receipt = await tx.wait();
      const gasUsed = receipt.fee;

      const senderBalAfter = await ethers.provider.getBalance(sender.address);

      expect(senderBalAfter).to.equal(senderBalBefore + lockAmount - gasUsed);

      const p = await promisePay.getPromise(1);
      expect(p.status).to.equal(3); // CANCELLED
    });

    it('Should fail if non-sender attempts to cancel', async function () {
      await expect(promisePay.connect(recipient).cancelPromise(1)).to.be.revertedWith(
        'ONLY_SENDER_CAN_CANCEL'
      );
    });

    it('Should fail if trying to cancel an already verified promise', async function () {
      await promisePay.connect(sender).verifyPromise(1);
      await expect(promisePay.connect(sender).cancelPromise(1)).to.be.revertedWith(
        'PROMISE_CANNOT_BE_CANCELLED'
      );
    });
  });
});
