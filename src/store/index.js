import { createStore } from "vuex";

import getJobs from "@/api/getJobs";

export const LOGIN_USER = "LOGIN_USER";
export const RECEIVE_JOBS = "RECEIVE_JOBS";
export const FETCH_JOBS = "FETCH_JOBS";
export const UNIQUE_ORGANIZATIONS = "UNIQUE_ORGANIZATIONS";
export const ADD_SELECTED_ORGANIZATIONS = "ADD_SELECTED_ORGANIZATIONS";
export const ADD_SELECTED_JOB_TYPES = "ADD_SELECTED_JOB_TYPES";
export const state = () => {
  return {
    isLoggedIn: false,
    jobs: [],
    selectedOrganizations: [],
    selectedJobTypes: [],
  };
};
export const mutations = {
  [LOGIN_USER](state) {
    state.isLoggedIn = true;
  },
  [RECEIVE_JOBS](state, jobs) {
    state.jobs = jobs;
  },
  [ADD_SELECTED_ORGANIZATIONS](state, selectedOrgs) {
    state.selectedOrganizations = selectedOrgs;
  },
  [ADD_SELECTED_JOB_TYPES](state, job_types) {
    state.selectedJobTypes = job_types;
  },
};

export const getters = {
  [UNIQUE_ORGANIZATIONS](state) {
    const uniqueOrganizations = new Set();
    state.jobs.forEach((job) => uniqueOrganizations.add(job.organization));
    return uniqueOrganizations;
  },
  UNIQUE_JOB_TYPES(state) {
    const uniqueJobTypes = new Set();
    state.jobs.forEach((job) => uniqueJobTypes.add(job.jobType));
    return uniqueJobTypes;
  },
  FILTERED_JOBS(state) {
    let filteredJobs = state.jobs;
    if (state.selectedOrganizations.length > 0) {
      filteredJobs = filteredJobs.filter((job) =>
        state.selectedOrganizations.includes(job.organization)
      );
    }
    if (state.selectedJobTypes.length > 0) {
      filteredJobs = filteredJobs.filter((job) =>
        state.selectedJobTypes.includes(job.jobType)
      );
    }

    return filteredJobs;
  },
};

export const actions = {
  [FETCH_JOBS]: async (context) => {
    const jobListings = await getJobs();
    context.commit(RECEIVE_JOBS, jobListings);
  },
};

export default createStore({
  state,
  mutations,
  actions,
  getters,
  strict: process.env.NODE_ENV !== "production",
});
