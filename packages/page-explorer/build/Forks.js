import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { CardSummary, IdentityIcon, SummaryBox } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';
import { formatNumber } from '@axia-js/util';
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

// adjust the number of columns in a cell based on the children and tree depth
function calcWidth(children) {
  return Math.max(1, children.reduce((total, {
    hdr: {
      width
    }
  }) => {
    return total + width;
  }, 0));
} // counts the height of a specific node


function calcHeight(children) {
  return children.reduce((max, {
    arr,
    hdr
  }) => {
    hdr.height = hdr.isEmpty ? 0 : 1 + calcHeight(arr);
    return Math.max(max, hdr.height);
  }, 0);
} // a single column in a row, it just has the details for the entry


function createCol({
  hdr: {
    author,
    hash,
    isEmpty,
    isFinalized,
    parent,
    width
  }
}) {
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

  return createRows(arr.reduce((children, {
    arr
  }) => children.concat(...arr), [])).concat({
    bn: arr.reduce((result, {
      hdr: {
        bn
      }
    }) => result || bn, ''),
    cols: arr.map(createCol)
  });
} // fills in a header based on the supplied data


function createHdr(bn, hash, parent, author, isEmpty = false) {
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
  const hasChildren = arr.some(({
    arr
  }) => arr.length !== 0);

  if (hasChildren) {
    // ok, non-empty found - iterate through an add at least an empty cell to all
    arr.filter(({
      arr
    }) => arr.length === 0).forEach(({
      arr
    }) => arr.push(createLink()));
    const newArr = arr.reduce((flat, {
      arr
    }) => flat.concat(...arr), []); // go one level deeper, ensure that the full tree has empty spacers

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

function renderCol({
  author,
  hash,
  isEmpty,
  isFinalized,
  parent,
  width
}, index) {
  return /*#__PURE__*/_jsx("td", {
    className: `header ${isEmpty ? 'isEmpty' : ''} ${isFinalized ? 'isFinalized' : ''}`,
    colSpan: width,
    children: isEmpty ? /*#__PURE__*/_jsx("div", {
      className: "empty"
    }) : /*#__PURE__*/_jsxs(_Fragment, {
      children: [author && /*#__PURE__*/_jsx(IdentityIcon, {
        className: "author",
        size: 28,
        value: author
      }), /*#__PURE__*/_jsxs("div", {
        className: "contents",
        children: [/*#__PURE__*/_jsx("div", {
          className: "hash",
          children: hash
        }), /*#__PURE__*/_jsx("div", {
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
  return rows.map(({
    bn,
    cols
  }, index) => {
    // if not first, not last and single only, see if we can collapse
    if (index !== 0 && index !== lastIndex && isSingleRow(cols)) {
      if (isPrevShort) {
        // previous one was already a link, this one as well - skip it
        return null;
      } else if (isSingleRow(rows[index - 1].cols)) {
        isPrevShort = true;
        return /*#__PURE__*/_jsxs("tr", {
          children: [/*#__PURE__*/_jsx("td", {}, 'blockNumber'), /*#__PURE__*/_jsx("td", {
            className: "header isLink",
            colSpan: cols[0].width,
            children: /*#__PURE__*/_jsx("div", {
              className: "link",
              children: "\u22EE"
            })
          })]
        }, bn);
      }
    }

    isPrevShort = false;
    return /*#__PURE__*/_jsxs("tr", {
      children: [/*#__PURE__*/_jsx("td", {
        children: `#${bn}`
      }, 'blockNumber'), cols.map(renderCol)]
    }, bn);
  });
}

function Forks({
  className
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [tree, setTree] = useState(null);
  const childrenRef = useRef(new Map([['root', []]]));
  const countRef = useRef({
    numBlocks: 0,
    numForks: 0
  });
  const headersRef = useRef(new Map());
  const firstNumRef = useRef('');

  const _finalize = useCallback(hash => {
    const hdr = headersRef.current.get(hash);

    if (hdr && !hdr.isFinalized) {
      hdr.isFinalized = true;

      _finalize(hdr.parent);
    }
  }, []); // adds children for a specific header, retrieving based on matching parent


  const _addChildren = useCallback((base, children) => {
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


  const _generateTree = useCallback(() => {
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

    root.arr.forEach(({
      arr,
      hdr
    }) => {
      _addChildren(hdr, arr);
    }); // align the columns with empty spacers - this aids in display

    addColumnSpacers(root.arr);
    root.hdr.height = calcHeight(root.arr);
    root.hdr.width = calcWidth(root.arr);
    return root;
  }, [_addChildren]); // callback when finalized


  const _newFinalized = useCallback(header => {
    _finalize(header.hash.toHex());
  }, [_finalize]); // callback for the subscribe headers sub


  const _newHeader = useCallback(header => {
    // formatted block info
    const bn = formatNumber(header.number);
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

  useEffect(() => {
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

  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsx(SummaryBox, {
      children: /*#__PURE__*/_jsxs("section", {
        children: [/*#__PURE__*/_jsx(CardSummary, {
          label: t('blocks'),
          children: formatNumber(countRef.current.numBlocks)
        }), /*#__PURE__*/_jsx(CardSummary, {
          label: t('forks'),
          children: formatNumber(countRef.current.numForks)
        })]
      })
    }), /*#__PURE__*/_jsx("table", {
      children: /*#__PURE__*/_jsx("tbody", {
        children: renderRows(createRows(tree.arr))
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Forks).withConfig({
  displayName: "Forks",
  componentId: "sc-1oewpjs-0"
})(["margin-bottom:1.5rem;table{border-collapse:separate;border-spacing:0.25rem;font:var(--font-mono);td{padding:0.25rem 0.5rem;text-align:center;.author,.contents{display:inline-block;vertical-align:middle;}.author{margin-right:0.25rem;}.contents{.hash,.parent{margin:0 auto;max-width:6rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}.parent{font-size:0.75rem;line-height:0.75rem;max-width:4.5rem;}}&.blockNumber{font-size:1.25rem;}&.header{background:#fff;border:1px solid #e6e6e6;border-radius:0.25rem;&.isEmpty{background:transparent;border-color:transparent;}&.isFinalized{background:rgba(0,255,0,0.1);}&.isLink{background:transparent;border-color:transparent;line-height:1rem;padding:0;}&.isMissing{background:rgba(255,0,0,0.05);}}}}"]));