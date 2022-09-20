import { state, mutations, actions, getters } from "@/store";
import getJobs from "@/api/getJobs";
jest.mock("@/api/getJobs");

describe("state", () => {
  it("keeps track of whether user is logged in", () => {
    const startingState = state();
    expect(startingState.isLoggedIn).toBe(false);
  });

  it("stores job listings", () => {
    const startingState = state();
    expect(startingState.jobs).toEqual([]);
  });

  it("stores organizations that the user would like to filter jobs by", () => {
    const startingState = state();
    expect(startingState.selectedOrganizations).toEqual([]);
  });
});

describe("mutations", () => {
  describe("LOGIN_USER", () => {
    it("logs user in", () => {
      const state = { isLoggedIn: false };
      mutations.LOGIN_USER(state);
      expect(state.isLoggedIn).toBe(true);
    });
  });

  describe("RECEIVE_JOBS", () => {
    it("receives jobs from API response", () => {
      const state = { jobs: [] };
      mutations.RECEIVE_JOBS(state, ["Job 1", "Job 2"]);
      expect(state.jobs).toEqual(["Job 1", "Job 2"]);
    });
  });

  describe("ADD_SELECTED_ORGANIZATIONS", () => {
    it("updates organizations that the user has chosen to filter jobs by", () => {
      const state = { selectedOrganizations: [] };
      mutations.ADD_SELECTED_ORGANIZATIONS(state, ["Google", "Amazon"]);
      expect(state.selectedOrganizations).toEqual(["Google", "Amazon"]);
    });
  });
});

describe("actions", () => {
  describe("FETCH_JOBS", () => {
    beforeEach(() => {
      getJobs.mockResolvedValue([
        {
          id: 1,
          name: "Job developer",
        },
      ]);
    });
    it("makes a request to fetch jobs", async () => {
      const context = { commit: jest.fn() };
      await actions.FETCH_JOBS(context);
      expect(getJobs).toHaveBeenCalled();
    });

    it("sends message to save received jobs in store", async () => {
      const commit = jest.fn();
      const context = { commit };
      await actions.FETCH_JOBS(context);
      expect(commit).toHaveBeenCalledWith("RECEIVE_JOBS", [
        {
          id: 1,
          name: "Job developer",
        },
      ]);
    });
  });
});

describe("getters", () => {
  describe("UNIQUE_ORGANIZATIONS", () => {
    it("finds unique organizations from list of jobs", async () => {
      const state = {
        jobs: [
          { organization: "Google" },
          { organization: "Amazon" },
          { organization: "Google" },
        ],
      };
      const result = getters.UNIQUE_ORGANIZATIONS(state);
      expect(result).toEqual(new Set(["Google", "Amazon"]));
    });
  });

  describe("FILTERED_JOBS", () => {
    it("identifies jobs that are associated with the given organizations", async () => {
      const state = {
        jobs: [
          { organization: "Google" },
          { organization: "Amazon" },
          { organization: "Google" },
        ],
        selectedOrganizations: ["Google"],
        selectedJobTypes: [],
      };
      const result = getters.FILTERED_JOBS(state);
      expect(result).toEqual([
        { organization: "Google" },
        { organization: "Google" },
      ]);
    });

    describe("when the user has not selected any organizations", () => {
      it("returns all jobs", () => {
        const state = {
          jobs: [
            { organization: "Google" },
            { organization: "Amazon" },
            { organization: "Google" },
          ],
          selectedOrganizations: [],
          selectedJobTypes: [],
        };
        const result = getters.FILTERED_JOBS(state);
        expect(result).toEqual(state.jobs);
      });
    });
  });
});
