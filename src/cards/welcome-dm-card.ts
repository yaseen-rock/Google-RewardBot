export function welcomeDMCard(userDisplayName) {
  const cardHeader = {
    title: `🥳 Hi ${userDisplayName} Thanks for adding Reward Bot`,
  };

  const avatarWidget = {
    textParagraph: {
      text: `You can send your peers reward for their acheivements or appreciate them for helping you right from spaces
              To know how to use Rewards Bot,click the tour button`,
    },
  };

  const tourButton = {
    buttonList: {
      buttons: [
        {
          text: 'Start tour',
          color: {
            red: 0,
            green: 0,
            blue: 1,
            alpha: 0.5,
          },
          onClick: {
            action: {
              function: 'getTourCard',
              parameters: [
                {
                  key: 'cardNumber',
                  value: 1,
                },
              ],
            },
          },
          altText: 'Learn how to use reward bot',
        },
      ],
    },
  };

  const avatarSection = {
    widgets: [avatarWidget, tourButton],
  };

  let cardData = {
    cardsV2: [
      {
        cardId: 'Welcome DM Card',
        card: {
          name: 'Welcome DM Card',
          header: cardHeader,
          sections: [avatarSection],
        },
      },
    ],
  };

  return cardData;
}
