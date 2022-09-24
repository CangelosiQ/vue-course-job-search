import { mount } from "@vue/test-utils";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import JobFilterSidebar from "@/components/jobResults/jobFiltersSidebar/jobFiltersSidebar.vue";
import { useUniqueOrganizations } from "@/store/composables";
jest.mock("vuex");
jest.mock("vue-router");
jest.mock("@/store/composables");

describe("JobFilterSidebar", () => {
  const createConfig = () => ({
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  it("renders unique list of organizations", async () => {
    useUniqueOrganizations.mockReturnValue(new Set(["Google", "Amazon"]));
    const wrapper = mount(JobFilterSidebar, createConfig());
    const organizationAccordion = wrapper.find(
      "[data-test='accordion-group-checkboxes-Organizations']"
    );
    const clickableArea = organizationAccordion.find(
      "[data-test='clickable-area']"
    );
    await clickableArea.trigger("click");
    const organizationLabels = wrapper.findAll(
      "[data-test='checkbox-label-Organizations']"
    );
    const organizations = organizationLabels.map((node) => node.text());
    expect(organizations).toEqual(["Google", "Amazon"]);
  });

  it("communicates that user has selected checkbox for organization", async () => {
    const push = jest.fn();
    useRouter.mockReturnValue({ push });
    const commit = jest.fn();
    useStore.mockReturnValue({ commit });
    useUniqueOrganizations.mockReturnValue(new Set(["Google"]));
    const config = createConfig();
    const wrapper = mount(JobFilterSidebar, config);
    const organizationAccordion = wrapper.find(
      "[data-test='accordion-group-checkboxes-Organizations']"
    );
    const clickableArea = organizationAccordion.find(
      "[data-test='clickable-area']"
    );
    await clickableArea.trigger("click");
    const googleInput = wrapper.find("[data-test='Google']");
    await googleInput.setChecked();
    expect(commit).toHaveBeenCalledWith("ADD_SELECTED_ORGANIZATIONS", [
      "Google",
    ]);
    expect(push).toHaveBeenCalledWith({ name: "jobs" });
  });
});
