import { View, SplitLayout } from "@vkontakte/vkui";
import { useActiveVkuiLocation } from "@vkontakte/vk-mini-apps-router";

import { DEFAULT_VIEW_PANELS } from "./routes";
import { Home } from "../pages/Home";
import { NewsPage } from "../pages/NewsPage";

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } =
    useActiveVkuiLocation();

  return (
    <SplitLayout>
      <View activePanel={activePanel}>
        <Home id="home" />
        <NewsPage id="news" />
      </View>
    </SplitLayout>
  );
};
