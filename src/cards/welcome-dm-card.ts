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
