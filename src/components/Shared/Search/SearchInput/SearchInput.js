import { useState } from "react";
import { View, Animated, Keyboard } from "react-native";
import { Searchbar } from "react-native-paper";
import { AnimatedIcon, searchAnimation } from "./SearchInput.animation";
import { styles } from "./Searchinput.styles";

export function SearchInput() {
  const [containerHeight, setContainerHeight] = useState(0);

  const openSearch = () => {
    searchAnimation.transition.start();
    // openCloseHistory();
  };

  const closeSearch = () => {
    searchAnimation.transitionReset.start();
    Keyboard.dismiss();
    // openCloseHistory();
  };
  return (
    <View
      style={styles.container}
      onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)}
    >
      <View style={styles.containerInput}>
        <AnimatedIcon
          name="arrow-left"
          size={20}
          style={[styles.backArrow, searchAnimation.arrow]}
          onPress={closeSearch}
        />
        <Animated.View style={[searchAnimation.input, {width: searchAnimation.inputWidth}]}>
          <Searchbar
            placeholder="Busca tu producto"
            autoCapitalize="none"
            style={styles.searchBar}
            onFocus={openSearch}
          />
        </Animated.View>
      </View>
    </View>
  );
}
