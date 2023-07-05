export function getThanksMessageDialog() {
  return {
    action_response: {
      type: 'DIALOG',
      dialog_action: {
        dialog: {
          body: {
            sections: [
              {
                header: '',
                widgets: [
                  {
                    textParagraph: {
                      text: 'Thank you for your feedback.Your feedback is shared with our team',
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
