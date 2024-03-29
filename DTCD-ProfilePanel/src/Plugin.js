import pluginMeta from './Plugin.Meta';
import PluginComponent from './PluginComponent.vue';

import {
  AppPanelPlugin,
  StyleSystemAdapter,
  InteractionSystemAdapter,
} from './../../DTCD-SDK/index';

export class ProfilePanel extends AppPanelPlugin {
  static getRegistrationMeta() {
    return pluginMeta;
  }

  constructor(guid, selector) {
    super();

    const { default: VueJS } = this.getDependence('Vue');
    const styleSystem = new StyleSystemAdapter('0.5.0');
    const interactionSystem = new InteractionSystemAdapter('0.4.0');
    const data = { guid, styleSystem, interactionSystem };

    new VueJS({
      data: () => data,
      render: h => h(PluginComponent),
    }).$mount(selector);
  }
}
