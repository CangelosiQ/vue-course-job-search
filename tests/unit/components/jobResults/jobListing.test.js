import { mount, RouterLinkStub } from "@vue/test-utils";

import JobListing from "@/components/jobResults/jobListing.vue";

describe("JobListing", () => {
  const createJobProps = (jobProps = {}) => ({
    title: "Vue Developer",
    organization: "Airbnb",
    ...jobProps,
  });

  const createConfig = (jobProps) => ({
    props: {
      job: { ...jobProps },
    },
    global: {
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
  });

  it("renders job title", () => {
    const jobProps = createJobProps({ title: "Vue Programmer" });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch("Vue Programmer");
  });

  it("renders organization", () => {
    const jobProps = createJobProps();
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch("Airbnb");
  });

  it("renders job locations", () => {
    const jobProps = createJobProps({ locations: ["Orlando", "Los Angeles"] });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch("Orlando");
    expect(wrapper.text()).toMatch("Los Angeles");
  });

  it("renders job qualifications", () => {
    const jobProps = createJobProps({
      minimumQualifications: ["Python", "Azure"],
    });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch("Python");
    expect(wrapper.text()).toMatch("Azure");
  });
  it("links to individual job's page", () => {
    const jobProps = createJobProps({
      id: 42,
    });
    const wrapper = mount(JobListing, createConfig(jobProps));
    const jobPageLink = wrapper.findComponent(RouterLinkStub);
    const toProp = jobPageLink.props("to");
    expect(toProp).toBe("/jobs/results/42");
  });
});
