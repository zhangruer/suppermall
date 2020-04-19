import Request from './request'

export function getDtail(iid) {
    return Request({
        url: '/detail',
        params: {
            iid
        }
    })
}