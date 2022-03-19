import USID from 'usid'

const usid = new USID()

export const generateUUID = () => usid.uuid()
