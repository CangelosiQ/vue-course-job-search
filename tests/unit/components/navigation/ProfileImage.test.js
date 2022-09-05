import { shallowMount } from "@vue/test-utils";

import ProfileImage from "@/components/navigation/ProfileImage.vue";

describe("ProfileImage", () => {
  it("renders", () => {
    const wrapper = shallowMount(ProfileImage);
    expect(wrapper.exists()).toBe(true);
  });
});
