import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from "../../components/Burger/BuildContols/BuildControls";
import Modal from "../../components/UI/Modal/Modal";

configure({ adapter: new Adapter() });

describe("<BurgerBuilder />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />);
  });
  it("should render <BuildControls /> when recieving ingredients", () => {
    wrapper.setProps({ ings: { salad: 1, bacon: 1, meat: 1, cheese: 1 } });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
  it("should render <Modal /> if ordered", () => {
    wrapper.setProps({ ordered: true });
    expect(
      wrapper.containsMatchingElement(<Modal ordered={true}></Modal>)
    ).toEqual(false);
  });
  it("should not render <Modal /> if not ordered", () => {
    wrapper.setProps({ ordered: false });
    expect(
      wrapper.containsMatchingElement(<Modal ordered={false}></Modal>)
    ).toEqual(true);
  });
});
