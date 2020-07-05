import events from './events';

export default {
  stream: null,
  trackEvents: events,
  defer: true,
  dimensions: {}
};

export const mutationObserverConfig = {
  subtree: true,
  characterData: true,
  characterDataOldVaue: true,
  childList: true,
  attributes: true,
};
