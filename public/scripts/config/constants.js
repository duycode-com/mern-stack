export const _SERVER = "http://localhost:8888"

export const url_getListCollection = () => `${_SERVER}/api/list-collections`

export const url_list = (collection) => `${_SERVER}/api/${collection}/list`
export const url_trash = (collection) => `${_SERVER}/api/${collection}/trash`
export const url_insert = (collection) => `${_SERVER}/api/${collection}/insert`
export const url_update = (collection, _id) => `${_SERVER}/api/${collection}/update/${_id}`
export const url_replace = (collection, _id) => `${_SERVER}/api/${collection}/replace/${_id}`
export const url_remove = (collection, _id) => `${_SERVER}/api/${collection}/remove/${_id}`
export const url_restore = (collection, _id) => `${_SERVER}/api/${collection}/restore/${_id}`
export const url_destroy = (collection, _id) => `${_SERVER}/api/${collection}/destroy/${_id}`
export const url_findID = (collection, _id) => `${_SERVER}/api/${collection}/findID/${_id}`

export const url_remove_list = (collection) => `${_SERVER}/api/${collection}/remove-list`
export const url_restore_list = (collection) => `${_SERVER}/api/${collection}/restore-list`
export const url_destroy_list = (collection) => `${_SERVER}/api/${collection}/destroy-list`
export const url_destroy_trash = (collection) => `${_SERVER}/api/${collection}/destroy-trash`

export const url_login = () => `${_SERVER}/auth/login`
export const url_register = () => `${_SERVER}/auth/register`
export const url_logout = () => `${_SERVER}/auth/logout`
export const url_refresh_token = () => `${_SERVER}/auth/refresh-token`
