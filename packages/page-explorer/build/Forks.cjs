"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// adjust the number of columns in a cell based on the children and tree depth
function calcWidth(children) {
  return Math.max(1, children.reduce((total, _ref) => {
    let {
      hdr: {
        width
      }
    } = _ref;
    return total + width;
  }, 0));
} // counts the height of a specific node


function calcHeight(children) {
  return children.reduce((max, _ref2) => {
    let {
      arr,
      hdr
    } = _ref2;
    hdr.height = hdr.isEmpty ? 0 : 1 + calcHeight(arr);
    return Math.max(max, hdr.height);
  }, 0);
} // a single column in a row, it just has the details for the entry


function createCol(_ref3) {
  let {
    hdr: {
      author,
      hash,
      isEmpty,
      isFinalized,
      parent,
      width
    }
  } = _ref3;
  return {
    author,
    hash,
    isEmpty,
    isFinalized,
    parent,
    width
  };
} // create a simplified structure that allows for easy rendering


function createRows(arr) {
  if (!arr.length) {
    return [];
  }

  return createRows(arr.reduce((children, _ref4) => {
    let {
      arr
    } = _ref4;
    return children.concat(...arr);
  }, [])).concat({
    bn: arr.reduce((result, _ref5) => {
      let {
        hdr: {
          bn
        }
      } = _ref5;
      return result || bn;
    }, ''),
    cols: arr.map(createCol)
  });
} // fills in a header based on the supplied data


function createHdr(bn, hash, parent, author) {
  let isEmpty = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  return {
    author,
    bn,
    hash,
    height: 0,
    isEmpty,
    isFinalized: false,
    parent,
    width: 0
  };
} // empty link helper


function createLink() {
  return {
    arr: [],
    hdr: createHdr('', ' ', ' ', null, true)
  };
} // even out the columns, i.e. add empty spacers as applicable to get tree rendering right


function addColumnSpacers(arr) {
  // check is any of the children has a non-empty set
  const hasChildren = arr.some(_ref6 => {
    let {
      arr
    } = _ref6;
    return arr.length !== 0;
  });

  if (hasChildren) {
    // ok, non-empty found - iterate through an add at least an empty cell to all
    arr.filter(_ref7 => {
      let {
        arr
      } = _ref7;
      return arr.length === 0;
    }).forEach(_ref8 => {
      let {
        arr
      } = _ref8;
      return arr.push(createLink());
    });
    const newArr = arr.reduce((flat, _ref9) => {
      let {
        arr
      } = _ref9;
      return flat.concat(...arr);
    }, []); // go one level deeper, ensure that the full tree has empty spacers

    addColumnSpacers(newArr);
  }
} // checks to see if a row has a single non-empty entry, i.e. it is a candidate for collapsing


function isSingleRow(cols) {
  if (!cols[0] || cols[0].isEmpty) {
    return false;
  }

  return cols.reduce((result, col, index) => {
    return index === 0 ? result : !col.isEmpty ? false : result;
  }, true);
}

function renderCol(_ref10, index) {
  let {
    author,
    hash,
    isEmpty,
    isFinalized,
    parent,
    width
  } = _ref10;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
    className: `header ${isEmpty ? 'isEmpty' : ''} ${isFinalized ? 'isFinalized' : ''}`,
    colSpan: width,
    children: isEmpty ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "empty"
    }) : /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [author && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.IdentityIcon, {
        className: "author",
        size: 28,
        value: author
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "contents",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "hash",
          children: hash
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "parent",
          children: parent
        })]
      })]
    })
  }, `${hash}:${index}:${width}`);
} // render the rows created by createRows to React nodes


function renderRows(rows) {
  const lastIndex = rows.length - 1;
  let isPrevShort = false;
  return rows.map((_ref11, index) => {
    let {
      bn,
      cols
    } = _ref11;

    // if not first, not last and single only, see if we can collapse
    if (index !== 0 && index !== lastIndex && isSingleRow(cols)) {
      if (isPrevShort) {
        // previous one was already a link, this one as well - skip it
        return null;
      } else if (isSingleRow(rows[index - 1].cols)) {
        isPrevShort = true;
        return /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {}, 'blockNumber'), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
            className: "header isLink",
            colSpan: cols[0].width,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              className: "link",
              children: "\u22EE"
            })
          })]
        }, bn);
      }
    }

    isPrevShort = false;
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        children: `#${bn}`
      }, 'blockNumber'), cols.map(renderCol)]
    }, bn);
  });
}

function Forks(_ref12) {
  let {
    className
  } = _ref12;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [tree, setTree] = (0, _react.useState)(null);
  const childrenRef = (0, _react.useRef)(new Map([['root', []]]));
  const countRef = (0, _react.useRef)({
    numBlocks: 0,
    numForks: 0
  });
  const headersRef = (0, _react.useRef)(new Map());
  const firstNumRef = (0, _react.useRef)('');

  const _finalize = (0, _react.useCallback)(hash => {
    const hdr = headersRef.current.get(hash);

    if (hdr && !hdr.isFinalized) {
      hdr.isFinalized = true;

      _finalize(hdr.parent);
    }
  }, []); // adds children for a specific header, retrieving based on matching parent


  const _addChildren = (0, _react.useCallback)((base, children) => {
    // add the children
    (childrenRef.current.get(base.hash) || []).map(hash => headersRef.current.get(hash)).filter(hdr => !!hdr).forEach(hdr => {
      children.push({
        arr: _addChildren(hdr, []),
        hdr
      });
    }); // calculate the max height/width for this entry

    base.height = calcHeight(children);
    base.width = calcWidth(children); // place the active (larger, finalized) columns first for the pyramid display

    children.sort((a, b) => a.hdr.width > b.hdr.width || a.hdr.height > b.hdr.height || a.hdr.isFinalized ? -1 : a.hdr.width < b.hdr.width || a.hdr.height < b.hdr.height || b.hdr.isFinalized ? 1 : 0);
    return children;
  }, []); // create a tree list from the available headers


  const _generateTree = (0, _react.useCallback)(() => {
    const root = createLink(); // add all the root entries first, we iterate from these
    // We add the root entry explicitly, it exists as per init

    (childrenRef.current.get('root') || []).forEach(hash => {
      const hdr = headersRef.current.get(hash); // if this fails, well, we have a bigger issue :(

      if (hdr) {
        root.arr.push({
          arr: [],
          hdr: _objectSpread({}, hdr)
        });
      }
    }); // iterate through, adding the children for each of the root nodes

    root.arr.forEach(_ref13 => {
      let {
        arr,
        hdr
      } = _ref13;

      _addChildren(hdr, arr);
    }); // align the columns with empty spacers - this aids in display

    addColumnSpacers(root.arr);
    root.hdr.height = calcHeight(root.arr);
    root.hdr.width = calcWidth(root.arr);
    return root;
  }, [_addChildren]); // callback when finalized


  const _newFinalized = (0, _react.useCallback)(header => {
    _finalize(header.hash.toHex());
  }, [_finalize]); // callback for the subscribe headers sub


  const _newHeader = (0, _react.useCallback)(header => {
    // formatted block info
    const bn = (0, _util.formatNumber)(header.number);
    const hash = header.hash.toHex();
    const parent = header.parentHash.toHex();
    let isFork = false; // if this the first one?

    if (!firstNumRef.current) {
      firstNumRef.current = bn;
    }

    if (!headersRef.current.has(hash)) {
      // if this is the first, add to the root entry
      if (firstNumRef.current === bn) {
        childrenRef.current.get('root').push(hash);
      } // add to the header map
      // also for HeaderExtended header.author ? header.author.toString() : null


      headersRef.current.set(hash, createHdr(bn, hash, parent, null)); // check to see if the children already has a entry

      if (childrenRef.current.has(parent)) {
        isFork = true;
        childrenRef.current.get(parent).push(hash);
      } else {
        childrenRef.current.set(parent, [hash]);
      } // if we don't have the parent of this one, retrieve it


      if (!headersRef.current.has(parent)) {
        // just make sure we are not first in the list, we don't want to full chain
        if (firstNumRef.current !== bn) {
          console.warn(`Retrieving missing header ${header.parentHash.toHex()}`);
          api.rpc.chain.getHeader(header.parentHash).then(_newHeader).catch(console.error); // catch the refresh on the result

          return;
        }
      } // update our counters


      countRef.current.numBlocks++;

      if (isFork) {
        countRef.current.numForks++;
      } // do the magic, extract the info into something useful and add to state


      setTree(_generateTree());
    }
  }, [api, _generateTree]);

  (0, _react.useEffect)(() => {
    let _subFinHead = null;
    let _subNewHead = null;
    (async () => {
      _subFinHead = await api.rpc.chain.subscribeFinalizedHeads(_newFinalized);
      _subNewHead = await api.rpc.chain.subscribeNewHeads(_newHeader);
    })().catch(console.error);
    return () => {
      _subFinHead && _subFinHead();
      _subNewHead && _subNewHead();
    };
  }, [api, _newFinalized, _newHeader]);

  if (!tree) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.SummaryBox, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
          label: t('blocks'),
          children: (0, _util.formatNumber)(countRef.current.numBlocks)
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
          label: t('forks'),
          children: (0, _util.formatNumber)(countRef.current.numForks)
        })]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("table", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("tbody", {
        children: renderRows(createRows(tree.arr))
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Forks).withConfig({
  displayName: "Forks",
  componentId: "sc-1oewpjs-0"
})(["margin-bottom:1.5rem;table{border-collapse:separate;border-spacing:0.25rem;font:var(--font-mono);td{padding:0.25rem 0.5rem;text-align:center;.author,.contents{display:inline-block;vertical-align:middle;}.author{margin-right:0.25rem;}.contents{.hash,.parent{margin:0 auto;max-width:6rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}.parent{font-size:0.75rem;line-height:0.75rem;max-width:4.5rem;}}&.blockNumber{font-size:1.25rem;}&.header{background:#fff;border:1px solid #e6e6e6;border-radius:0.25rem;&.isEmpty{background:transparent;border-color:transparent;}&.isFinalized{background:rgba(0,255,0,0.1);}&.isLink{background:transparent;border-color:transparent;line-height:1rem;padding:0;}&.isMissing{background:rgba(255,0,0,0.05);}}}}"]));

exports.default = _default;