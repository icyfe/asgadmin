const getters = {
    phone: state => state.user.phone,
    pid: state => state.user.pid,
    avatar: state => state.user.avatar,
    operatorcode: state => state.user.operatorcode,
    name: state => state.user.name,
    jurisdiction: state => state.user.jurisdiction,
    txmessage: state => state.user.txmessage,
    play: state => state.user.play
}
export default getters
