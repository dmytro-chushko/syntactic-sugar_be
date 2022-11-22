export const postMailServiceHtml = (
  purpose: 'confirmEmail' | 'resetPassword',
  link: string,
): string => {
  let title: string;

  switch (purpose) {
    case 'confirmEmail':
      title = 'To confirm your email';
      break;
    case 'resetPassword':
      title = 'To reset your password';
      break;
    default:
      title = '!Wrong purpose set!';
  }

  return `<div>
            <h1>${title} follow the link bellow</h1>    
            <a href = "${link}">${link}</a>
          </div>`;
};
