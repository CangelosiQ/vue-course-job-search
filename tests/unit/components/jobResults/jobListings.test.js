import { shallowMount, flushPromises, RouterLinkStub } from "@vue/test-utils";

import JobListings from "@/components/jobResults/jobListings.vue";

describe("JobListings", () => {
  const createConfig = (queryParams = {}, storeParams = {}) => ({
    global: {
      mocks: {
        $route: {
          query: {
            page: "5",
            ...queryParams,
          },
        },
        $store: { ...storeParams },
      },
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
  });

  const createStore = (config = {}) => ({
    state: { jobs: Array(15).fill({}) },
    dispatch: jest.fn(),
    ...config,
  });

  describe("when component mounts", () => {
    it("makes call to fetch jobs from API", () => {
      const $store = createStore();
      shallowMount(JobListings, createConfig({}, $store));
      expect($store.dispatch).toHaveBeenCalledWith("FETCH_JOBS");
    });
  });

  it("create a job listing for a maximum of 10 jobs", async () => {
    const storeParams = createStore();
    const wrapper = shallowMount(
      JobListings,
      createConfig({ page: "1" }, storeParams)
    );
    await flushPromises();
    const jobs = wrapper.findAll("[data-test='job-listing']");
    expect(jobs).toHaveLength(10);
  });

  describe("when query params exclude page number", () => {
    it("displays page number 1", () => {
      const queryParams = { page: undefined };
      const storeParams = createStore();
      const wrapper = shallowMount(
        JobListings,
        createConfig(queryParams, storeParams)
      );
      expect(wrapper.text()).toMatch("Page 1");
    });
  });

  describe("when query params include page number", () => {
    it("displays page number 42", () => {
      const queryParams = { page: "42" };
      const storeParams = createStore();

      const wrapper = shallowMount(
        JobListings,
        createConfig(queryParams, storeParams)
      );
      expect(wrapper.text()).toMatch("Page 42");
    });
  });

  describe("when the user is on first page of job results", () => {
    it("does not show link to the previous page", () => {
      const queryParams = { page: "1" };
      const storeParams = createStore();
      const wrapper = shallowMount(
        JobListings,
        createConfig(queryParams, storeParams)
      );
      const previousPage = wrapper.find("[data-test='previous-page-link']");
      expect(previousPage.exists()).toBe(false);
    });
    it("shows link to the next page", async () => {
      const queryParams = { page: "1" };
      const storeParams = createStore();
      const wrapper = shallowMount(
        JobListings,
        createConfig(queryParams, storeParams)
      );
      await flushPromises();
      const nextPage = wrapper.find("[data-test='next-page-link']");
      expect(nextPage.exists()).toBe(true);
    });
  });

  describe("when the user is on last page of job results", () => {
    it("shows link to the previous page", () => {
      const queryParams = { page: "2" };
      const storeParams = createStore();
      const wrapper = shallowMount(
        JobListings,
        createConfig(queryParams, storeParams)
      );
      const previousPage = wrapper.find("[data-test='previous-page-link']");
      expect(previousPage.exists()).toBe(true);
    });
    it("does not show link to the next page", async () => {
      const queryParams = { page: "2" };
      const storeParams = createStore();

      const wrapper = shallowMount(
        JobListings,
        createConfig(queryParams, storeParams)
      );
      await flushPromises();
      const nextPage = wrapper.find("[data-test='next-page-link']");
      expect(nextPage.exists()).toBe(false);
    });
  });
});
