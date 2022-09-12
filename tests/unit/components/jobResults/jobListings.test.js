import { shallowMount, flushPromises, RouterLinkStub } from "@vue/test-utils";
import axios from "axios";
jest.mock("axios");

import JobListings from "@/components/jobResults/jobListings.vue";

describe("JobListings", () => {
  const createConfig = (queryParams = {}) => ({
    global: {
      mocks: {
        $route: {
          query: {
            page: "5",
            ...queryParams,
          },
        },
      },
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
  });

  afterEach(() => {
    axios.get.mockReset();
  });

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: Array(15).fill({}) });
  });

  it("fetches jobs", () => {
    shallowMount(JobListings, createConfig());
    expect(axios.get).toHaveBeenCalledWith("http://fakeapi.com:3000/jobs");
  });

  it("create a job listing for a maximum of 10 jobs", async () => {
    const wrapper = shallowMount(JobListings, createConfig({ page: "1" }));
    await flushPromises();
    const jobs = wrapper.findAll("[data-test='job-listing']");
    expect(jobs).toHaveLength(10);
  });

  describe("when query params exclude page number", () => {
    it("displays page number 1", () => {
      const queryParams = { page: undefined };
      const wrapper = shallowMount(JobListings, createConfig(queryParams));
      expect(wrapper.text()).toMatch("Page 1");
    });
  });

  describe("when query params include page number", () => {
    it("displays page number 42", () => {
      const queryParams = { page: "42" };
      const wrapper = shallowMount(JobListings, createConfig(queryParams));
      expect(wrapper.text()).toMatch("Page 42");
    });
  });

  describe("when the user is on first page of job results", () => {
    it("does not show link to the previous page", () => {
      const queryParams = { page: "1" };
      const wrapper = shallowMount(JobListings, createConfig(queryParams));
      const previousPage = wrapper.find("[data-test='previous-page-link']");
      expect(previousPage.exists()).toBe(false);
    });
    it("shows link to the next page", async () => {
      const queryParams = { page: "1" };
      const wrapper = shallowMount(JobListings, createConfig(queryParams));
      await flushPromises();
      const nextPage = wrapper.find("[data-test='next-page-link']");
      expect(nextPage.exists()).toBe(true);
    });
  });

  describe("when the user is on last page of job results", () => {
    it("shows link to the previous page", () => {
      axios.get.mockResolvedValue({ data: Array(15).fill({}) });
      const queryParams = { page: "2" };
      const wrapper = shallowMount(JobListings, createConfig(queryParams));
      const previousPage = wrapper.find("[data-test='previous-page-link']");
      expect(previousPage.exists()).toBe(true);
    });
    it("does not show link to the next page", async () => {
      axios.get.mockResolvedValue({ data: Array(15).fill({}) });
      const queryParams = { page: "2" };
      const wrapper = shallowMount(JobListings, createConfig(queryParams));
      await flushPromises();
      const nextPage = wrapper.find("[data-test='next-page-link']");
      expect(nextPage.exists()).toBe(false);
    });
  });
});
