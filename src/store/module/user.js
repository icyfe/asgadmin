import { postLogin } from '@/api/login'
import { message } from 'ant-design-vue'
import { getCashDrawlList } from "@/api/cashdrawal";
const user = {
    state: {
        // user: '',
        // status: '',
        // code: '',
        // token: getToken(),
        phone: '',
        name: '',
        avatar: '',
        introduction: '',
        operatorcode: '',
        jurisdiction: '',
        txmessage: '',
        play: true,
        // roles: [],
        // setting: {
        //   articlePlatform: []
        // }
    },

    mutations: {
        // SET_CODE: (state, code) => {
        //   state.code = code
        // },
        // SET_TOKEN: (state, token) => {
        //   state.token = token
        // },
        // SET_INTRODUCTION: (state, introduction) => {
        //   state.introduction = introduction
        // },
        // SET_SETTING: (state, setting) => {
        //   state.setting = setting
        // },
        // SET_STATUS: (state, status) => {
        //   state.status = status
        // },

        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_PID: (state, pid) => {
            state.pid = pid
        },
        SET_PHONE: (state, phone) => {
            state.phone = phone
        },
        SET_OPERATORCODE: (state, operatorcode) => {
            state.operatorcode = operatorcode
        },
        SET_JURISDICTION: (state, jurisdiction) => {
            state.jurisdiction = jurisdiction
        },
        SET_TXMESSAGE: (state, txmessage) => {
            state.txmessage = txmessage
        },
        SET_PLAY: (state, play) => {
            state.play = play
        }
        // SET_ROLES: (state, roles) => {
        //   state.roles = roles
        // }
    },

    actions: {
        // 检查用户是否已经登录过
        CheckLogin({ commit }) {
            return new Promise((resolve, reject) => {
                let user = JSON.parse(sessionStorage.getItem('user'))
                // console.log('user', user)
                if (user) {
                    commit('SET_NAME', user.name);
                    commit('SET_AVATAR', user.avatar);
                    commit('SET_PID', user.pid)
                    commit('SET_PHONE', user.phone);
                    commit('SET_OPERATORCODE', user.operatorcode)
                    commit('SET_JURISDICTION', user.jurisdiction)
                    commit('SET_TXMESSAGE', user.txdata)
                    resolve(true)
                } else {
                    resolve(false);
                }
            })
        },
        // 用户名登录
        LoginByUsername({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                postLogin({ user: userInfo.user, password: userInfo.password }).then(response => {
                    const data = response.data
                    if (data.code != 200) {
                        message.error(data.msg, 3)
                        resolve(data);
                    } else {
                        let { user } = data
                        getCashDrawlList().then(res => {
                            let txdata = res.data;
                            if (txdata.code != 200) return this.$message.error("请求出错！");
                            user.txdata = txdata.data.filter((item, index, list) => {
                                return item.StautsType == "审核中";
                            });
                            sessionStorage.setItem('user', JSON.stringify(user));
                            console.log('userasd', user)
                            commit('SET_NAME', user.name);
                            commit('SET_AVATAR', user.avatar);
                            commit('SET_PID', user.pid)
                            commit('SET_PHONE', user.phone);
                            commit('SET_OPERATORCODE', user.operatorcode)
                            commit('SET_TXMESSAGE', user.txdata)
                            resolve(true)
                        });
                    }
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 获取用户信息
        GetUserInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                getUserInfo(state.token).then(response => {
                    // 由于mockjs 不支持自定义状态码只能这样hack
                    if (!response.data) {
                        reject('Verification failed, please login again.')
                    }
                    const data = response.data

                    if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
                        commit('SET_ROLES', data.roles)
                    } else {
                        reject('getInfo: roles must be a non-null array!')
                    }

                    commit('SET_NAME', data.name)
                    commit('SET_AVATAR', data.avatar)
                    commit('SET_INTRODUCTION', data.introduction)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 第三方验证登录
        // LoginByThirdparty({ commit, state }, code) {
        //   return new Promise((resolve, reject) => {
        //     commit('SET_CODE', code)
        //     loginByThirdparty(state.status, state.email, state.code).then(response => {
        //       commit('SET_TOKEN', response.data.token)
        //       setToken(response.data.token)
        //       resolve()
        //     }).catch(error => {
        //       reject(error)
        //     })
        //   })
        // },

        // 登出
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                logout(state.token).then(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_ROLES', [])
                    removeToken()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 前端 登出
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                removeToken()
                resolve()
            })
        },

        // 动态修改权限
        ChangeRoles({ commit, dispatch }, role) {
            return new Promise(resolve => {
                commit('SET_TOKEN', role)
                setToken(role)
                getUserInfo(role).then(response => {
                    const data = response.data
                    commit('SET_ROLES', data.roles)
                    commit('SET_NAME', data.name)
                    commit('SET_AVATAR', data.avatar)
                    commit('SET_INTRODUCTION', data.introduction)
                    dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
                    resolve()
                })
            })
        }
    }
}

export default user
