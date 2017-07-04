import axios from 'axios'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

const instance = axios.create(){{#if_eq lintConfig "airbnb"}};{{/if_eq}}

export default instance{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
