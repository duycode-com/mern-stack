import {
    url_list, url_trash,
    url_insert, url_update, url_replace, url_remove, url_restore, url_destroy,
    url_remove_list, url_restore_list, url_destroy_trash, url_destroy_list
} from '../config/constants.js';
import {
    action_setCollection_list,
    action_setCollection_trash,
    action_setResponse,
    action_changeCollection
} from './database_slice.js'

export const api_getCollection_list = (name) => async (dispatch) => {
    let response = await fetch(url_list(name))
    let responseJSON = await response.json()
    dispatch(action_setCollection_list({
        name: name,
        data: responseJSON.data
    }))
}

export const api_getCollection_trash = (name) => async (dispatch) => {
    let response = await fetch(url_trash(name))
    let responseJSON = await response.json()
    dispatch(action_setCollection_trash({
        name: name,
        data: responseJSON.data
    }))
}

export const api_insert = (name, collection) => async (dispatch) => {
    let response = await fetch(url_insert(name), {
        method: 'POST',
        body: JSON.stringify(collection),
        headers: { 'Content-Type': 'application/json' }
    })
    let responseJSON = await response.json();
    if (!responseJSON.data) return
    dispatch(action_changeCollection({ type: "ADD", name: name, response: responseJSON }))
}

export const api_update = (name, id, item) => async (dispatch) => {
    let { _id, createdAt, updatedAt, removedAt, ...data } = item
    let response = await fetch(url_update(name, id), {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
    let responseJSON = await response.json();
    if (!responseJSON.data) return
    dispatch(action_changeCollection({ type: "UPDATE", name: name, response: responseJSON }))
}

export const api_replace = (name, id, item) => async (dispatch) => {
    let { _id, createdAt, updatedAt, removedAt, ...data } = item
    let response = await fetch(url_replace(name, id), {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
    let responseJSON = await response.json();
    if (!responseJSON.data) return
    dispatch(action_changeCollection({ type: "REPLACE", name: name, response: responseJSON }))
}

export const api_remove = (name, _id) => async (dispatch) => {
    let response = await fetch(url_remove(name, _id), { method: 'PATCH' })
    let responseJSON = await response.json()
    if (!responseJSON.data) return
    dispatch(action_changeCollection({ type: "REMOVE", name: name, response: responseJSON }))
}

export const api_restore = (name, _id) => async (dispatch) => {
    let response = await fetch(url_restore(name, _id), { method: 'PATCH' })
    let responseJSON = await response.json()
    if (!responseJSON.data) return
    dispatch(action_changeCollection({ type: "RESTORE", name: name, response: responseJSON }))
}

export const api_destroy = (name, _id) => async (dispatch) => {
    let response = await fetch(url_destroy(name, _id), { method: 'DELETE' })
    let responseJSON = await response.json()
    if (!responseJSON.data) return
    dispatch(action_changeCollection({ type: "DESTROY", name: name, response: responseJSON }))
}

export const api_remove_list = (name, _ids) => async (dispatch) => {
    if (_ids.length == 0) return
    let response = await fetch(url_remove_list(name), {
        method: 'PATCH',
        body: JSON.stringify({ _ids }),
        headers: { 'Content-Type': 'application/json' }
    })
    let responseJSON = await response.json();
    dispatch(action_setResponse({ response: responseJSON }))
    if (!responseJSON.data) return
    dispatch(api_getCollection_list(name))
    dispatch(api_getCollection_trash(name))
}

export const api_restore_list = (name, _ids) => async (dispatch) => {
    if (_ids.length == 0) return
    let response = await fetch(url_restore_list(name), {
        method: 'PATCH',
        body: JSON.stringify({ _ids }),
        headers: { 'Content-Type': 'application/json' }
    })
    let responseJSON = await response.json();
    dispatch(action_setResponse({ response: responseJSON }))
    if (!responseJSON.data) return
    dispatch(api_getCollection_list(name))
    dispatch(api_getCollection_trash(name))
}

export const api_destroy_list = (name, _ids) => async (dispatch) => {
    if (_ids.length == 0) return
    let response = await fetch(url_destroy_list(name), {
        method: 'DELETE',
        body: JSON.stringify({ _ids }),
        headers: { 'Content-Type': 'application/json' }
    })
    let responseJSON = await response.json();
    dispatch(action_setResponse({ response: responseJSON }))
    if (!responseJSON.data) return
    dispatch(api_getCollection_trash(name))
}

export const api_destroy_trash = (name) => async (dispatch) => {
    console.log(url_destroy_trash(name));
    let response = await fetch(url_destroy_trash(name), { method: 'DELETE' })
    let responseJSON = await response.json();
    dispatch(action_setResponse({ response: responseJSON }))
    if (!responseJSON.data) return
    dispatch(api_getCollection_trash(name))
}