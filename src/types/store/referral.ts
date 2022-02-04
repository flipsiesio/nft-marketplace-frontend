export type ReferralStateStats = {
  totalEarnings: string,
  invitedPlayers: number,
  rank: string,
  rankName: string,
  rankMaxValue: string,
  bonus: string,
};

export type ReferralState = ReferralStateStats & {
  link: string,
};
