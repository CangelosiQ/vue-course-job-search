import { shallowMount, flushPromises, RouterLinkStub } from "@vue/test-utils";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import JobListings from "@/components/jobResults/jobListings.vue";
import { useFilteredJobs } from "@/store/composables";
jest.mock("vuex");
jest.mock("vue-router");
jest.mock("@/store/composables");

describe("JobListings", () => {
  describe("when component mounts", () => {
    it("makes call to fetch jobs from API", () => {
      const dispatch = jest.fn();
      useRoute.mockReturnValue({
        query: { page: 1 },
      });
      useStore.mockReturnValue({
        getters: {},
        dispatch,
      });
      useFilteredJobs.mockReturnValue({ value: [] });
      shallowMount(JobListings);
      expect(dispatch).toHaveBeenCalledWith("FETCH_JOBS");
    });
  });

  it("create a job listing for a maximum of 10 jobs", async () => {
    useRoute.mockReturnValue({
      query: { page: 1 },
    });
    useStore.mockReturnValue({
      getters: {},
      dispatch: jest.fn(),
    });
    useFilteredJobs.mockReturnValue({ value: Array(15).fill({ id: 42 }) });
    const wrapper = shallowMount(JobListings);
    await flushPromises();
    const jobs = wrapper.findAll("[data-test='job-listing']");
    expect(jobs).toHaveLength(10);
  });

  describe("when query params exclude page number", () => {
    it("displays page number 1", () => {
      useRoute.mockReturnValue({
        query: { page: 1 },
      });
      useStore.mockReturnValue({
        getters: {},
        dispatch: jest.fn(),
      });
      useFilteredJobs.mockReturnValue({ value: [] });
      const wrapper = shallowMount(JobListings);
      expect(wrapper.text()).toMatch("Page 1");
    });
  });

  describe("when query params include page number", () => {
    it("displays page number 42", () => {
      useRoute.mockReturnValue({
        query: { page: 42 },
      });
      useStore.mockReturnValue({
        getters: {},
        dispatch: jest.fn(),
      });
      useFilteredJobs.mockReturnValue({ value: [] });

      const wrapper = shallowMount(JobListings);
      expect(wrapper.text()).toMatch("Page 42");
    });
  });

  describe("when the user is on first page of job results", () => {
    it("does not show link to the previous page", () => {
      useRoute.mockReturnValue({
        query: { page: 1 },
      });
      useStore.mockReturnValue({
        getters: {},
        dispatch: jest.fn(),
      });
      useFilteredJobs.mockReturnValue({ value: [] });
      const wrapper = shallowMount(JobListings);
      const previousPage = wrapper.find("[data-test='previous-page-link']");
      expect(previousPage.exists()).toBe(false);
    });
    it("shows link to the next page", async () => {
      useRoute.mockReturnValue({
        query: { page: 1 },
      });
      useStore.mockReturnValue({
        getters: {},
        dispatch: jest.fn(),
      });
      useFilteredJobs.mockReturnValue({ value: Array(15).fill({ id: 42 }) });
      const wrapper = shallowMount(JobListings);
      await flushPromises();
      const nextPage = wrapper.find("[data-test='next-page-link']");
      expect(nextPage.exists()).toBe(true);
    });
  });

  describe("when the user is on last page of job results", () => {
    it("shows link to the previous page", () => {
      useRoute.mockReturnValue({
        query: { page: 2 },
      });
      useStore.mockReturnValue({
        getters: {},
        dispatch: jest.fn(),
      });
      useFilteredJobs.mockReturnValue({ value: [] });
      const wrapper = shallowMount(JobListings);
      const previousPage = wrapper.find("[data-test='previous-page-link']");
      expect(previousPage.exists()).toBe(true);
    });
    it("does not show link to the next page", async () => {
      useRoute.mockReturnValue({
        query: { page: 2 },
      });
      useStore.mockReturnValue({
        getters: {},
        dispatch: jest.fn(),
      });
      useFilteredJobs.mockReturnValue({ value: [] });
      const wrapper = shallowMount(JobListings);
      await flushPromises();
      const nextPage = wrapper.find("[data-test='next-page-link']");
      expect(nextPage.exists()).toBe(false);
    });
  });
});
