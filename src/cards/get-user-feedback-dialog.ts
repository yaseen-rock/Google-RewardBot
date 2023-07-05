export function getUserFeedbackCard() {
  //   const cardHeader = {
  //     title: `Happy to Hear your feedback`,
  //   };

  //   const avatarWidget = {
  //     textParagraph: {
  //       text: `Please share your feedback/suggestion to improve Rewards Bot with us`,
  //     },
  //   };

  //   const imageWidget = {
  //     image: {
  //       imageUrl: 'https://i.imgur.com/MtZwitR.png',
  //       altText: 'send-rewards-to-peers',
  //     },
  //   };

  //   const tourButton = {
  //     buttonList: {
  //       buttons: [
  //         {
  //           text: 'Next',
  //           color: {
  //             red: 0,
  //             green: 0,
  //             blue: 1,
  //             alpha: 0.5,
  //           },
  //           onClick: {
  //             action: {
  //               function: 'getTourCard',
  //               parameters: [
  //                 {
  //                   key: 'cardNumber',
  //                   value: 2,
  //                 },
  //               ],
  //             },
  //           },
  //           altText: 'Next topics to explore',
  //         },
  //         {
  //           text: 'Cancel',
  //           color: {
  //             red: 0,
  //             green: 0,
  //             blue: 1,
  //             alpha: 0.5,
  //           },
  //           onClick: {
  //             action: {
  //               function: 'getTourCard',
  //               parameters: [
  //                 {
  //                   key: 'cardNumber',
  //                   value: 4,
  //                 },
  //               ],
  //             },
  //           },
  //           altText: 'Cancel the tour',
  //         },
  //       ],
  //     },
  //   };

  //   const avatarSection = {
  //     widgets: [avatarWidget, imageWidget, tourButton],
  //   };

  //   let cardData = {
  //     cardsV2: [
  //       {
  //         cardId: 'Tour Card 1',
  //         card: {
  //           name: 'Tour Card 1',
  //           header: cardHeader,
  //           sections: [avatarSection],
  //         },
  //       },
  //     ],
  //   };

  //   return cardData;

  return {
    action_response: {
      type: 'DIALOG',
      dialog_action: {
        dialog: {
          body: {
            sections: [
              {
                header: 'Happy to hear from you',
                widgets: [
                  {
                    textInput: {
                      label: 'Share your feedback',
                      type: 'MULTIPLE_LINE',
                      name: 'feedback',
                    },
                  },
                  {
                    buttonList: {
                      buttons: [
                        {
                          text: 'Submit',
                          onClick: {
                            action: {
                              function: 'saveFeedback',
                            },
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            ],
          },
        },
      },
    },
  };
}
