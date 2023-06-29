export function welcomeCard() {
  const cardHeader = {
    title: `🥳 Thanks for adding Reward Bot`,
  };

  const avatarWidget = {
    textParagraph: {
      text: `You can send your peers reward for their acheivements or appreciate them for helping you right from spaces
          To know more send /help`,
    },
  };

  const avatarSection = {
    widgets: [avatarWidget],
  };

  let cardData = {
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

  return cardData;
}
