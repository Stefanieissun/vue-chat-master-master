/**
 * Vuex
 * http://vuex.vuejs.org/zh-cn/intro.html
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const now = new Date();
//store应该由数据库动态获取
const store = new Vuex.Store({
    state: {
        // 当前用户
        user: {
            name: 'coffce',
            img: '/dist/images/1.jpg'
        },
        // 会话列表
        sessions: [{
                id: 1,
                user: {
                    name: 'Vue',
                    img: '/dist/images/2.png'
                },
                messages: [{
                    content: 'Hello，这是一个基于Vue + Vuex + Webpack构建的简单chat示例，聊天记录保存在localStorge, 有什么问题可以通过Github Issue问我。',
                    date: now
                }, {
                    content: 'Hello，这是一个基于Vue + Vuex + Webpack构建的简单chat示例，聊天记录保存在localStorge, 有什么问题可以通过Github Issue问我。',
                    date: now
                }]
            },
            {
                id: 2,
                user: {
                    name: 'webpack',
                    img: '/dist/images/3.jpg'
                },
                messages: [{
                    content: 'Hello，这是一个基于Vue + Vuex + Webpack构建的简单chat示例，聊天记录保存在localStorge, 有什么问题可以通过Github Issue问我。',
                    date: now
                }]
            }
        ],
        // 当前选中的会话
        currentSessionId: 1,
        // 过滤出只包含这个key的会话
        filterKey: ''
    },
    mutations: {
        INIT_DATA(state) {
            let data = localStorage.getItem('vue-chat-session');
            if (data) {
                state.sessions = JSON.parse(data);
            }
        },
        // 发送消息

        SEND_MESSAGE({
            sessions,
            currentSessionId
        }, content) {
            
            let session = sessions.find(item => item.id === currentSessionId);
            session.messages.push({
                content: content,
                date: new Date(),
                self: true
            });
        },
        //他人发送信息
        SEND_MESSAGE2({
            
            sessions,
            currentSessionId
        },data) {
            
            let session = sessions.find(item => item.id ===data.id);
            // let session = sessions.find(item => currentSessionId === item.id);

            session.messages.push({
                content: data.content1,
                date: new Date()
            });

        },
        // 选择会话
        SELECT_SESSION(state, id) {
            state.currentSessionId = id;
        },
        // 搜索
        SET_FILTER_KEY(state, value) {
            state.filterKey = value;
        },
        //清除消息
        CLEAR_CONTENT(data) {
                
                    let {
                        sessions,
                        currentSessionId
                    } = data;
                
              let session = data.sessions.find(item => item.id === currentSessionId);
              session.messages=[];
        }
    }
});

store.watch(
    (state) => state.sessions,
    (val) => {
        // console.log('CHANGE: ', val);
        localStorage.setItem('vue-chat-session', JSON.stringify(val));
      
    }, {
        deep: true
    }
);

export default store;
export const actions = {
    initData: ({
        dispatch
    }) => dispatch('INIT_DATA'),
    sendMessage: ({
        dispatch
    }, content) => dispatch('SEND_MESSAGE', content),
    selectSession: ({
        dispatch
    }, id) => dispatch('SELECT_SESSION', id),
    search: ({
        dispatch
    }, value) => dispatch('SET_FILTER_KEY', value),
    sendMessage2: ({
        dispatch
    }, content) => dispatch('SEND_MESSAGE2', content),
    clear_content:({dispatch})=>dispatch('CLEAR_CONTENT')
};