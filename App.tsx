import React, {useState} from 'react';
import {View, Text, FlatList, Pressable, SafeAreaView} from 'react-native';
import _ from 'lodash';

interface IItem {
  id: number;
  padding: number;
}

// adds random padding to simulate dynamic height
const randomPadding = () => _.random(0, 30);

const App = () => {
  const [data, setData] = useState<IItem[]>(
    Array.from(Array(100)).map((_, id) => ({id, padding: randomPadding()})),
  );

  const renderItem = ({item}: {item: IItem}) => (
    <View style={{padding: item.padding}}>
      <Text>
        {item.id}: {item.padding}
      </Text>
    </View>
  );

  const addItemToTop = () => {
    setData([{id: data[0].id - 1, padding: randomPadding()}, ...data]);
  };

  const addPage = () => {
    setData([
      ...data,
      ...Array.from(Array(100)).map((_, id) => ({
        id: data.length + id,
        padding: randomPadding(),
      })),
    ]);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={() => (
          <View style={{height: 1, backgroundColor: 'red'}} />
        )}
        onEndReached={() => addPage()}
        onEndReachedThreshold={0.5}
      />
      <View
        style={{
          padding: 30,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <Pressable onPress={() => addItemToTop()}>
          <Text style={{fontSize: 20, color: 'blue'}}>Add item top</Text>
        </Pressable>
        <Pressable onPress={() => addPage()}>
          <Text style={{fontSize: 20, color: 'blue'}}>Add page bottom</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default App;
