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
                  value: 5,
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
    widgets: [avatarWidget, tourButton],
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

  //   return {
  //     cardsV2: [
  //       {
  //         cardId: 'unique-card-id',
  //         card: {
  //           header: {
  //             title: 'Sasha',
  //             subtitle: 'Software Engineer',
  //             imageUrl:
  //               'https://developers.google.com/chat/images/quickstart-app-avatar.png',
  //             imageType: 'CIRCLE',
  //             imageAltText: 'Avatar for Sasha',
  //           },
  //           sections: [
  //             {
  //               header: 'Contact Info',
  //               collapsible: true,
  //               uncollapsibleWidgetsCount: 1,
  //               widgets: [
  //                 {
  //                   decoratedText: {
  //                     startIcon: {
  //                       knownIcon: 'EMAIL',
  //                     },
  //                     text: 'sasha@example.com',
  //                   },
  //                 },
  //                 {
  //                   decoratedText: {
  //                     startIcon: {
  //                       knownIcon: 'PERSON',
  //                     },
  //                     text: '<font color="#80e27e">Online</font>',
  //                   },
  //                 },
  //                 {
  //                   decoratedText: {
  //                     startIcon: {
  //                       knownIcon: 'PHONE',
  //                     },
  //                     text: '+1 (555) 555-1234',
  //                   },
  //                 },
  //                 {
  //                   buttonList: {
  //                     buttons: [
  //                       {
  //                         text: 'Share',
  //                         onClick: {
  //                           openLink: {
  //                             url: 'https://example.com/share',
  //                           },
  //                         },
  //                       },
  //                       {
  //                         text: 'Edit',
  //                         onClick: {
  //                           action: {
  //                             function: 'goToView',
  //                             parameters: [
  //                               {
  //                                 key: 'viewType',
  //                                 value: 'EDIT',
  //                               },
  //                             ],
  //                           },
  //                         },
  //                       },
  //                     ],
  //                   },
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //       },
  //     ],
  //   };
}
