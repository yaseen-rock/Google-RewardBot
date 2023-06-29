export function myPointsCard(user) {
  return {
    text: `
        Your Giveable credits for this month: *${user.credits}*
        Your redeemable reward point: *${user.rewards}*
        You can send redeem request using /redeem 
        _Eg: /redeem_`,
  };
}
