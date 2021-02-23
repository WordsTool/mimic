import React, { FunctionComponent, useRef } from 'react';
import styled from 'styled-components';
import i18n from '../../../../utils/i18n';
import HelpTitle from '../HelpTitle';
import FaqItem, { FaqItemAnswer, FaqItemQuestion } from './FaqItem';

const Container = styled.div`
  padding: 0 0 24px 0;
`;

const Faq: FunctionComponent = () => {
  const { current: list } = useRef([
    [i18n('faq_show_panel_question'), i18n('faq_show_panel_answer')],
    [i18n('faq_unpin_panel_question'), i18n('faq_unpin_panel_answer')],
    [i18n('faq_keep_open_question'), i18n('faq_keep_open_answer')],
    [i18n('faq_open_new_tab_question'), i18n('faq_open_new_tab_answer')],
    [i18n('faq_change_position_question'), i18n('faq_change_position_answer')],
    [i18n('faq_change_theme_question'), i18n('faq_change_theme_answer')],
    [i18n('faq_reorder_question'), i18n('faq_reorder_answer')],
    [i18n('faq_disable_question'), i18n('faq_disable_answer')],
  ]);

  return (
    <Container>
      <HelpTitle>
        {i18n('faq_title')}
      </HelpTitle>
      {list.map(([question, answer]) => (
        <FaqItem key={question}>
          <FaqItemQuestion>{question}</FaqItemQuestion>
          <FaqItemAnswer>{answer}</FaqItemAnswer>
        </FaqItem>
      ))}
    </Container>
  );
};

export default Faq;
