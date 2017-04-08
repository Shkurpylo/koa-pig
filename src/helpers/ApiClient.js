import superagent from 'superagent';
import config from '../../config.json';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  // Prepend host and port of the API server to the path.
  return 'http://' + config.apiHost + ':' + config.apiPort + adjustedPath;
}

export default class ApiClient {
  constructor(req) {
    console.log('REQ is: ' +  req)
    methods.forEach((method) =>
      this[method] = (path, {
        params,
        data
      } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));

        console.log(path);
        console.log(request);

        if (params) {
          console.log('available params: ' + params);
          request.query(params);
        }


        // if (req.get('cookie')) {
        //   request.set('cookie', req.get('cookie'));
        // }

        if (data) {
          console.log('available data ' + data);
          request.query(data);
        }

        request.end((err, {body} = {}) => { console.log(err); err ? reject(body || err) : resolve(body)});
      }));
  }
  /*
   * There's a V8 bug where, when using Babel, exporting classes with only
   * constructors sometimes fails. Until it's patched, this is a solution to
   * "ApiClient is not defined" from issue #14.
   * https://github.com/erikras/react-redux-universal-hot-example/issues/14
   *
   * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
   *
   * Remove it at your own risk.
   */
  empty() {}
}
