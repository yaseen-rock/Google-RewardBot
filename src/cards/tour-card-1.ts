export function tourCard1() {
  const cardHeader = {
    title: `How to Send Rewards to Peers?`,
  };

  const avatarWidget = {
    textParagraph: {
      text: `Now you can send rewards to your peers from spaces<br>
      Go to spaces where your peer is in and send the Appreciation/Recognization Command<br>
      <text><font color=\"#0000ff\"><b>Eg @Rewards Bot @john Doe +10 for helping in brainstorming the business ideas #teamwork</b></text>`,
    },
  };

  const imageWidget = {
    image: {
      imageUrl:
        'https://rewards-bot-images.s3.amazonaws.com/rewards-command.png',
      onClick: {
        openLink: {
          url: 'https://rewards-bot-images.s3.amazonaws.com/rewards-command.png',
        },
      },
      altText: 'send-rewards-to-peers',
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
                  value: 2,
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
        cardId: 'Tour Card 1',
        card: {
          name: 'Tour Card 1',
          header: cardHeader,
          sections: [avatarSection],
        },
      },
    ],
  };

  return cardData;
}
