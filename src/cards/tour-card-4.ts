export function tourCard4() {
  const cardHeader = {
    title: `Use /help anytime to get to know how to use Rewards Bot`,
  };

  const avatarWidget = {
    textParagraph: {
      text: `We are happy to hear a feedback from you. Share your feedback/suggestion to improve Rewards Bot`,
    },
  };

  const userFeedbackButton = {
    buttonList: {
      buttons: [
        {
          text: 'Share Feedback',
          color: {
            red: 0,
            green: 0,
            blue: 1,
            alpha: 0.5,
          },
          onClick: {
            // action: {
            //   function: 'getTourCard',
            //   parameters: [
            //     {
            //       key: 'cardNumber',
            //       value: '5',
            //     },
            //   ],
            // },
            openDynamicLinkAction: {
              function: 'getUserFeedback',
              parameters: [
                {
                  key: 'user_feedback',
                  value: true,
                },
              ],
              loadIndicator: 'SPINNER',
              persistValues: true,
              interaction: 'OPEN_DIALOG',
            },
          },
          altText: 'Click to share feedback',
        },
      ],
    },
  };

  const avatarSection = {
    widgets: [avatarWidget, userFeedbackButton],
  };

  let cardData = {
    cardsV2: [
      {
        cardId: 'Tour Card 4',
        card: {
          name: 'Tour Card 4',
          header: cardHeader,
          sections: [avatarSection],
        },
      },
    ],
  };

  return cardData;
}
