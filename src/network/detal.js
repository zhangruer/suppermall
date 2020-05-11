import Request from "./request";

export function getDetail(iid) {
    return Request({
        url: '/detail',
        params: {
            iid
        }
    })
}

export function getRecommend() {
    return Request({
        url: '/recommend'
    })
}

  export class Goods {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title
        this.desc = itemInfo.desc
        this.newPrice = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.discount = itemInfo.discountDesc
        this.services = services
        this.columns = columns
        this.realPrice = itemInfo.lowNowPrice
    }
  }
//    const g = new goods()
//    g.title
export class Shop {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo
        this.name = shopInfo.name
        this.fans = shopInfo.cFans
        this.sells = shopInfo.cSells
        this.score = shopInfo.score
        this.goodsCount = shopInfo.cGoods
    }
}

export class GoodsParams {
    constructor(info, rule) {
        this.image = info.image ? info.image[0] : ''
        this.infos = info.set;
        this.sizes = rule.tables
    }
}

