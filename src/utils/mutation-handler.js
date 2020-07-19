import { createSnapshot } from 'wiki-events-snapshot';
import store from '../store';

export default function mutationHandler(mutations) {
  const payloads = [];

  mutations.forEach((mutation) => {
    const { target } = mutation;

    switch (mutation.type) {
      case 'attributes':
        payloads.push({
          uid: target.__we_id__,
          type: 'mutation',
          eventType: mutation.type,
          eventTarget: createSnapshot(target, false),
          timestamp: Date.now(),
        });
        break;
      case 'childList':
        payloads.push({
          uid: target.__we_id__,
          type: 'mutation',
          eventType: mutation.type,
          addedNodes: Array.from(mutation.addedNodes).map((addedNode) => createSnapshot(addedNode)),
          removedNodesId: Array.from(mutation.removedNodes)
            .map((removedNode) => removedNode.__we_id__),
          timestamp: Date.now(),
        });
        break;
      // no default
    }
  });

  payloads.forEach((payload) => {
    if (this.isStream) {
      this.config.stream(payload);
    } else {
      store.mutations.push(payload);
    }
  });
}
