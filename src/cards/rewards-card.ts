export function rewardsCard(receiver, rewardpt, sender, text) {
  const cardHeader = {
    title:
      `🥳` + `@${receiver}` + `                          ` + `+${rewardpt}`,
  };

  const avatarWidget = {
    textParagraph: {
      text: `${sender}: ${text}`,
    },
  };

  const avatarSection = {
    widgets: [avatarWidget],
  };

  return {
    cardsV2: [
      {
        cardId: 'avatarCard',
        card: {
          name: 'Avatar Card',
          header: cardHeader,
          sections: [avatarSection],
        },
      },
    ],
  };
}
