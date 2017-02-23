import { TimeTrackingToolPage } from './app.po';

describe('time-tracking-tool App', () => {
  let page: TimeTrackingToolPage;

  beforeEach(() => {
    page = new TimeTrackingToolPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
