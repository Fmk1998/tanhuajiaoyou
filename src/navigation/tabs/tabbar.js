import React, { Component } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import Friend from "../../pages/friend";
import Group from "../../pages/group";
import Message from "../../pages/message";
import My from "../../pages/my";
import TabNavigator from 'react-native-tab-navigator';
import * as SvgData from "../../res/fonts/iconSvg";
const dataSource = [
    {
        icon: SvgData.friend,
        selectedIcon: SvgData.selectedFriend,
        tabPage: 'Friend',
        tabName: '交友',
        badge: 0,
        component: Friend
    },
    {
        icon: SvgData.group,
        selectedIcon:  SvgData.selectedGroup,
        tabPage: 'Group',
        tabName: '圈子',
        badge: 0,
        component: Group
    },
    {
        icon: SvgData.message,
        selectedIcon:SvgData.selectedMessage,
        tabPage: 'Message',
        tabName: '消息',
        badge: 5,
        component: Message
    },
    {
        icon: SvgData.my,
        selectedIcon: SvgData.selectedMy,
        tabPage: 'My',
        tabName: '我的',
        badge: 0,
        component: My
    }

];

const Tabbar = (props) => {

    const [selectedTab,setSelectedTab] = React.useState('');

    return (
        <View style={{ flex: 1, backgroundColor: '#F5FCFF' }}>
            <TabNavigator   >
                {dataSource.map((v, i) => {
                    return (
                        <TabNavigator.Item
                            key={i}
                            selected={selectedTab === v.tabPage}
                            title={v.tabName}
                            tabStyle={stylesheet.tab}
                            titleStyle={{ color: '#999999' }}
                            selectedTitleStyle={{ color: '#c863b5' }}
                            renderIcon={() => <SvgUri width="23" height="23" svgXmlData={v.icon} />}
                            renderSelectedIcon={() => <SvgUri width="23" height="23" svgXmlData={v.selectedIcon} />}
                            badgeText={v.badge}
                            onPress={() => setSelectedTab(v.tabPage)}>
                            <v.component  />
                        </TabNavigator.Item>
                    )
                })}
            </TabNavigator>
        </View>
    );

};

const stylesheet = StyleSheet.create({
    tab: {
        justifyContent: "center"
    },
    tabIcon: {
        color: "#999",
        width: 23,
        height: 23
    }
})

export default Tabbar;
