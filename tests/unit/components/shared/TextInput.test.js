import { mount } from "@vue/test-utils";

import TextInput from "@/components/shared/TextInput";

describe("TextInput", () => {
  it("communicates that user has entered character", () => {
    const wrapper = mount(TextInput, {
      props: {
        modelValue: "",
      },
    });
    const input = wrapper.find("input");
    console.log(wrapper.emitted());
    input.setValue("A");
    input.setValue("Au");
    input.setValue("Aus");
    const messages = wrapper.emitted()["update:modelValue"];
    expect(messages).toEqual([["A"], ["Au"], ["Aus"]]);
  });
});
