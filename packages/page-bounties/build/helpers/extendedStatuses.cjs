"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProposalToDisplay = getProposalToDisplay;
exports.proposalNameToDisplay = proposalNameToDisplay;
// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
const validProposalNames = {
  Active: ['closeBounty', 'unassignCurator'],
  Approved: [],
  CuratorProposed: ['closeBounty', 'unassignCurator'],
  Funded: ['proposeCurator', 'closeBounty'],
  PendingPayout: ['unassignCurator'],
  Proposed: ['approveBounty', 'closeBounty']
};

function validMethods(status) {
  return validProposalNames[status.type];
}

function getProposalByMethod(bountyProposals, method) {
  return bountyProposals.find(_ref => {
    let {
      proposal
    } = _ref;
    return proposal.method === method;
  });
}

function bestValidProposalName(bountyProposals, status) {
  const methods = bountyProposals.map(_ref2 => {
    let {
      proposal
    } = _ref2;
    return proposal.method;
  });
  return validMethods(status).find(method => methods.includes(method));
}

function proposalNameToDisplay(bountyProposal, status) {
  if (bountyProposal.proposal.method !== 'unassignCurator') {
    return bountyProposal.proposal.method;
  }

  return status.isCuratorProposed ? 'unassignCurator' : 'slashCurator';
}

function getProposalToDisplay(bountyProposals, status) {
  var _getProposalByMethod;

  const method = bestValidProposalName(bountyProposals, status);
  return (_getProposalByMethod = getProposalByMethod(bountyProposals, method)) !== null && _getProposalByMethod !== void 0 ? _getProposalByMethod : null;
}