import React from 'react';
import styles from './styles.module.scss';

export const content2 = [
  {
    beforeTitle: '',
    title: 'Buyback system:',
    description: 'Our platform has an automatic buy-back system that buys NFTs and distributes them as jackpot prizes for users playing Flipsies, this feature will keep the floor rising regardless of “pumping” by holders.',
  },
  {
    beforeTitle: '',
    title: 'Staking/holding system:',
    description: `The longer you hold a NFT the more rewards you will get
            The higher the rarity score your tokens have the more rewards you will get
            You will get rewards as cash back according to the amount of bets that you did on Flipsies platform
            Starting rates for owning NFTs
            1 month - 3% trx, 2 months - 6% trx, 1 year - 36% trx, 2 years - 72% trx, 3 years - 108% trx, 4 years - 144% trx
            You can claim rewards every 7 days from token purchasing`,
  },
  {
    beforeTitle: '',
    title: '',
    description: 'All tokens will be divided into groups according to the purchase date. For example all tokens(NFTs) that a user has bought on the 22nd of April will be put into one group. All tokens that a user has bought on the 23 of April will be put into another groups. If this user decides to sell any amount of tokens from some of these groups, so in this case all rewards will be fixed and calculation for further rewards will continue from the start. Reward calculation for any groups will calculate separately from each other.',
  },
  {
    beforeTitle: 'Here is the formula for total rate calculation for one group:',
    title: '(CurrentTimeRate + (T * B)  ) + R',
    description: (
      <div className={styles.info__point_container}>
        <p className={styles.info__about}>*Will also be getting cashback as additional rewards</p>
        <p className={styles.info__point}><span className={styles.info__char}>T : </span>
          Total token amount - 1 (since there is not additional reward for owning just 1 token)
        </p>
        <p className={styles.info__point}><span className={styles.info__char}>B : </span>
          Additional rewards for the number of tokens
        </p>
        <p className={styles.info__point}><span className={styles.info__char}>R : </span>
          The sum of all tokens rarity in one group
        </p>
      </div>
    ),
  },

];

export const content1 = [
  {
    beforeTitle: '',
    title: 'Buyback system:',
    description: (
      <ul className={styles.info__point_list_buyback}>
        <li>Platform has automatically buyback system that always provide nfts for
          Jackpot winners
        </li>
        <li>100% payout for Jackpot any time guarantee</li>
      </ul>
    ),
  },
  {
    beforeTitle: '',
    title: 'Staking/holding system:',
    description: (
      <ul className={styles.info__point_list}>
        <li>The more and longer you are nfts owner the more rewards you will get</li>
        <li>The higher the rarity score your tokens have the more rewards you will get</li>
        <li>You will get rewards as cash back according to amount of bets that you did
          on Flipsies platform
        </li>
        <li>Starting rates for owning nfts.</li>
        <li>1 month - 3% trx, 2 months - 6% trx, 1 year - 36% trx, 2 years - 72% trx,
          3 years - 108% trx,
          4 years - 144% trx
        </li>
        <li>You can claim rewards only every 7 days from token purchasing.</li>
      </ul>
    ),
  },
  {
    beforeTitle: '',
    title: '',
    description: 'All tokens will be devided into groups according to purchase date. For example all tokens that user has bought on the 22nd of April will be put into one group.All tokens that user has bought on the 23 of April will be put into another groups.If this user decides to sell any amount of tokens from some of these groups so in this case all rewards will be fixed and calculation for further rewards will continue from the start. That means  from 1st day of holding. Exactly in the same way if user just bought these tokens. Reward calculation for any groups will calculate separately from each other.',
  },
  {
    beforeTitle: 'Here is the formula for total rate calculation for one group:',
    title: '(CurrentTimeRate + (T * B)  ) + R',
    description: (
      <div className={styles.info__point_container}>
        <p className={styles.info__about_two}>*Note that you will be also getting cashback as
          additional rewards
        </p>
        <p className={styles.info__point_two}>T : total tokes amount -
          1 (since there is not additional reward for owning just 1 token)
        </p>
        <p className={styles.info__point_two}>B : additional rewards for the number of tokens.</p>
        <p className={styles.info__point_two}>R: the sum of all tokens rarity in one group</p>
      </div>
    ),
  },

];
