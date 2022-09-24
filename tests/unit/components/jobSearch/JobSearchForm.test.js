import { mount } from "@vue/test-utils";
import { useRouter } from "vue-router";
import JobSearchForm from "@/components/jobSearch/JobSearchForm";
jest.mock("vue-router");

describe("JobSearchForm", () => {
  describe("when user submits form", () => {
    it("directs user to job results page with user's search parameters", async () => {
      const push = jest.fn();
      useRouter.mockReturnValue({ push });
      const wrapper = mount(JobSearchForm, {
        attachTo: document.body,
        global: {
          stubs: {
            FontAwesomeIcon: true,
          },
        },
      });
      const roleInput = wrapper.find("[data-test='role-input']");
      await roleInput.setValue("Vue Developer");

      const locationInput = wrapper.find("[data-test='location-input']");
      await locationInput.setValue("Dallas");
      const submitButton = wrapper.find("[data-test='form-submit-button']");
      await submitButton.trigger("click");
      expect(push).toHaveBeenCalledWith({
        name: "jobs",
        query: { role: "Vue Developer", location: "Dallas" },
      });
    });
  });
});
