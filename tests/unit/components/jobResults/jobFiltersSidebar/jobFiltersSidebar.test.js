import { mount } from "@vue/test-utils";

import JobFilterSidebar from "@/components/jobResults/jobFiltersSidebar/jobFiltersSidebar.vue";

describe("JobFilterSidebar", () => {
  const createConfig = (storeParams = {}) => ({
    global: {
      mocks: {
        $store: { ...storeParams },
        $router: {
          push: jest.fn(),
        },
      },
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  const createStore = (config = {}) => ({
    getters: {
      UNIQUE_ORGANIZATIONS: new Set(["Google", "Amazon"]),
    },
    ...config,
  });

  it("renders unique list of organizations", async () => {
    const wrapper = mount(JobFilterSidebar, createConfig(createStore()));
    const organizationAccordion = wrapper.find(
      "[data-test='accordion-organizations']"
    );
    const clickableArea = organizationAccordion.find(
      "[data-test='clickable-area']"
    );
    await clickableArea.trigger("click");
    const organizationLabels = wrapper.findAll("[data-test='organization']");
    const organizations = organizationLabels.map((node) => node.text());
    expect(organizations).toEqual(["Google", "Amazon"]);
  });

  it("communicates that user has selected checkbox for organization", async () => {
    const mock = jest.fn();
    const storeConfig = {
      state: {
        selectedOrganizations: [],
        selectedJobTypes: [],
      },
      commit: mock,
    };
    const config = createConfig(createStore(storeConfig));
    const wrapper = mount(JobFilterSidebar, config);
    const organizationAccordion = wrapper.find(
      "[data-test='accordion-organizations']"
    );
    const clickableArea = organizationAccordion.find(
      "[data-test='clickable-area']"
    );
    await clickableArea.trigger("click");
    const googleInput = wrapper.find("[data-test='Google']");
    await googleInput.setChecked();
    expect(mock).toHaveBeenCalledWith("ADD_SELECTED_ORGANIZATIONS", ["Google"]);
  });
});
