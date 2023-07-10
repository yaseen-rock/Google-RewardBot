export function tourCard3() {
  const cardHeader = {
    title: `Send /help anytime to know more`,
  };

  const avatarWidget = {
    textParagraph: {
      text: `You can use /help anytime to know all available feature of Rewards Bot.`,
    },
  };

  const imageWidget = {
    image: {
      imageUrl: 'https://rewards-bot-images.s3.amazonaws.com/help.png',
      onClick: {
        openLink: {
          url: 'https://rewards-bot-images.s3.amazonaws.com/help.png',
        },
      },
      altText: 'check-available-features',
    },
  };

  const videoMsgWidget = {
    textParagraph: {
      text: ' Watch this Video to know the features of Rewards Bot',
    },
  };

  const tourButton = {
    buttonList: {
      buttons: [
        {
          text: 'Show Video',
          color: {
            red: 0,
            green: 0,
            blue: 1,
            alpha: 0.5,
          },
          onClick: {
            openLink: {
              url: 'https://www.loom.com/share/018b78dae979405490e2749c11ada298?sid=ffaa35d9-b83c-4a20-865b-b539ffcb1cb5',
              openAs: 'OVERLAY',
              onClose: 'NOTHING',
            },
          },
          altText: 'Click to watch video',
        },
      ],
    },
  };

  const tourCompleteMsg = {
    textParagraph: {
      text: `<br> You have completed the tour.Please share your feedback to improve Rewards Bot`,
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
    widgets: [
      avatarWidget,
      imageWidget,
      videoMsgWidget,
      tourButton,
      tourCompleteMsg,
      userFeedbackButton,
    ],
  };

  let cardData = {
    cardsV2: [
      {
        cardId: 'Tour Card 3',
        card: {
          name: 'Tour Card 3',
          header: cardHeader,
          sections: [avatarSection],
        },
      },
    ],
  };

  return cardData;
}
