export function tourCard2() {
  const cardHeader = {
    title: `How to check your Credit/Reward points?`,
  };

  const avatarWidget = {
    textParagraph: {
      text: `You can check your reward points by sending /mypoint command from your direct message with bot`,
    },
  };

  const imageWidget = {
    image: {
      imageUrl: 'https://rewards-bot-images.s3.amazonaws.com/mypoint.png',
      onClick: {
        openLink: {
          url: 'https://rewards-bot-images.s3.amazonaws.com/mypoint.png',
        },
      },
      altText: 'check-available-credits-rewards',
    },
  };

  const tourButton = {
    buttonList: {
      buttons: [
        {
          text: 'Next',
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
                  value: 3,
                },
              ],
            },
          },
          altText: 'Next topics to explore',
        },
        {
          text: 'Cancel',
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
                  value: 4,
                },
              ],
            },
          },
          altText: 'Cancel the tour',
        },
      ],
    },
  };

  const avatarSection = {
    widgets: [avatarWidget, imageWidget, tourButton],
  };

  let cardData = {
    cardsV2: [
      {
        cardId: 'Tour Card 2',
        card: {
          name: 'Tour Card 2',
          header: cardHeader,
          sections: [avatarSection],
        },
      },
    ],
  };

  return cardData;
}
