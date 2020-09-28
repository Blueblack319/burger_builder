import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import BuildControls from "./BuildControls";
import BuildControl from "./BuildControl/BuildControl";

configure({ adapter: new Adapter() });

describe("<BuildControls />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <BuildControls
        price={22}
        addIngredient={() => {}}
        removeIngredient={() => {}}
        disabled={{}}
      />
    );
  });
  it("should render four BuildControl components", () => {
    expect(wrapper.find(BuildControl)).toHaveLength(4);
  });
  it("should render ORDER NOW button if authenticated", () => {
    wrapper.setProps({ isAuth: true });
    expect(wrapper.containsMatchingElement(<button>ORDER NOW</button>)).toEqual(
      true
    );
  });
  it("should render SIGN UP TO ORDER button if authenticated", () => {
    wrapper.setProps({ isAuth: false });
    expect(
      wrapper.containsMatchingElement(<button>SIGN UP TO ORDER</button>)
    ).toEqual(true);
  });
});
