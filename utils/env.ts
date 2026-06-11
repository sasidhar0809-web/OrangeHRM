export enum Env {
  QA = 'QA',
  STAGE = 'STAGE',
  New='New'
}

export const baseURLs = {
  QA: 'https://opensource-demo.orangehrmlive.com', //'https://www.demoblaze.com/',
  STAGE: 'https://www.demoblaze.com/',//'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
  New:'https://demo.opencart.com/en-gb?route=common/home'//'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'//'https://www.demoblaze.com/'
};

export function getBaseURL(): string {
  const env = (process.env.ENV || 'QA') as Env;
  return baseURLs[env];
}