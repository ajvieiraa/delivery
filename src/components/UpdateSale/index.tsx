import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState, useContext } from 'react';
import { View, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Auth } from '../../store/auth/types';
import { Status, UpdateOrderData, Venda } from '../../services/api';
import { formatDate, parseDate } from '../../utils/date';
import money from '../../utils/money';
import Button from '../Button';
import DateTimePicker from '../DateTimePicker';
import FullModal from '../FullModal';
import Input from '../Input';
import SaleCard from '../SaleCard';
import Select from '../Select';
import { useAuth } from '../../store/auth';
import { Context } from '../../services/api/store/context';

import { BottomMessage, ContentContainer, FormContainer, Label, Value } from './styles';
import { showError, showMessage } from '../../utils/message';

interface Props {
  onSubmit: (data: UpdateOrderData) => Promise<void>;
  order: Venda;
  onError?: (err: any) => void;
  auth: Auth;
}

export interface UpdateSaleHandles {
  open(props: Props): void;
  close(): void;
}

interface FormData {
  mensagem?: string;
  data?: Date;
}

const UpdateSale: React.ForwardRefRenderFunction<UpdateSaleHandles, any> = (_, ref) => {
  const { address, auth, location, isClient, isPdv } = useAuth();
  const { baseUrl, token } = useContext(Context);

  useEffect(() => {
    console.log('TOKEN:', auth.access_token);
  }, []);

  const { control, handleSubmit, setValue, getValues } = useForm<FormData>();

  const [visible, setVisible] = useState(false);
  const [newStatus, setNewStatus] = useState<Status>();
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({
    mensagem: undefined,
  });

  const props = useRef<Props>();

  const open = useCallback((_props: Props) => {
    props.current = _props;
    setVisible(true);
  }, []);

  const close = useCallback(() => setVisible(false), []);

  useImperativeHandle(ref, () => ({ open, close }));

  //recusar
  const updateSaleStatus = async (id, data) => {
    try {
      const response = await axios.put(`http://137.184.117.63/api/venda/${id}`, data, {
        headers: { Authorization: `Bearer ${auth.access_token}` },
      });

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      console.log('REQUEST ERROR:', error);
    }
  };

  const onSubmit = useCallback(
    async (status: Status) => {
      const { mensagem, data } = getValues();
      const data_entrega = data ? `${formatDate(data)} 00:00:00` : null;
  
      console.log('Dados para atualização:', { status, mensagem, data_entrega });
  
      // Validação de status e mensagem
      if ([Status.RECUSADO, Status.CANCELADO].includes(status) && !mensagem) {
        setErrors({
          mensagem: 'Mensagem é obrigatória para recusar ou cancelar pedidos.',
        });
        return;
      }
  
      const updateData = {
        status,
        mensagem: mensagem || '', // Enviar string vazia se não houver mensagem
        ...(data_entrega && { data_entrega }), // Adicionar data_entrega se existir
      };
  
      try {
        const response = await updateSaleStatus(props.current.order.id, updateData);
  
        if (response && response.success) {
          console.log('Resposta da API:', response);
  
          props.current.order = {
            ...props.current.order,
            ...response.data, 
          };
  
          console.log('Pedido atualizado localmente:', props.current.order);
  
          showMessage(response.message || 'Pedido atualizado com sucesso!');
          //Alert.alert('Sucesso', response.message || 'Pedido atualizado com sucesso!');
          setVisible(false); 
        } else {
          const errorMessage = response?.message || 'Erro ao atualizar pedido.';
          showError(errorMessage);
          console.error('Erro na atualização do pedido:', errorMessage);
        }
      } catch (error) {
        console.error('Erro ao tentar atualizar o pedido:', error);
        showError('Ocorreu um erro inesperado ao atualizar o pedido.');
      }
    },
    [getValues],
  );

  useEffect(() => {
    if (!visible) setErrors({});
  }, [visible]);

  const noEdit =
    !!props.current?.order.status &&
    [Status.CANCELADO, Status.ENTREGUE, Status.RECUSADO].includes(props.current?.order.status);

  const isPending = props.current?.order.status === Status.PENDENTE;

  const canChangeStatus = props.current?.order.status && [Status['A CAMINHO'], Status.ACEITO, Status.FINALIZADO].includes(props.current.order.status);

  return (
    <FullModal setVisible={setVisible} visible={visible} title="Alterar pedido">
      <ContentContainer>
        {props.current?.order && <SaleCard hideInfo order={props.current?.order} />}

        <FormContainer>
          {!noEdit && (
            <>
              {props.current?.order.endereco ? (
                <View>
                  <Label>Forma de pagamento</Label>
                  <Value>{props.current?.order.pagamento}</Value>

                  <Label>Troco para</Label>
                  <Value>R$ {money(props.current?.order.troco_para)}</Value>

                  <Label>Endereço de entrega</Label>
                  <Value>{props.current?.order.endereco}</Value>

                  <Label>Responsável</Label>
                  <Value>{props.current?.order.responsavel}</Value>

                  {canChangeStatus && !noEdit && props.current?.order.endereco && (
                    <DateTimePicker
                      control={control}
                      name="data"
                      mode="date"
                      format="PPP"
                      label="Data de entrega"
                      placeholder="Toque para selecionar"
                      defaultDate={parseDate(props.current?.order.data_entrega) || new Date()}
                      onChange={(selectedDate) => {
                        setValue('data', selectedDate);
                        console.log('Data selecionada:', selectedDate);
                      }}
                    />
                  )}
                </View>
              ) : (
                <></>
              )}

              {!noEdit && canChangeStatus && (
                <Input
                  control={control}
                  name="mensagem"
                  label="Mensagem (obrigatório para recusar/cancelar)"
                  error={{ message: errors.mensagem }}
                  defaultValue={props.current?.order.mensagem || undefined}
                />
              )}

              {canChangeStatus && !noEdit && (
                <Select
                  control={control}
                  name="status"
                  label="Alterar status"
                  value={props.current?.order.status}
                  onChange={(option) => setNewStatus(option.value)}
                  options={[
                    { label: 'Finalizado', value: Status.FINALIZADO },
                    { label: 'A caminho', value: Status['A CAMINHO'] },
                    { label: 'Entregue', value: Status.ENTREGUE },
                    { label: 'Cancelado', value: Status.CANCELADO },
                  ]}
                />
              )}
            </>
          )}
        </FormContainer>
      </ContentContainer>

      {isPending && props.current?.order.status_lojista === Status.PENDENTE ? (
        <BottomMessage>Aguardando aprovação do lojista</BottomMessage>
      ) : (
        <>
          {isPending && (
            <>
              <Button
                onPress={() => {
                  Alert.alert(
                    'Confirmação',
                    'Tem certeza que deseja aceitar este pedido?',
                    [
                      {
                        text: 'Cancelar',
                        style: 'cancel',
                      },
                      {
                        text: 'Aceitar',
                        onPress: () => onSubmit(Status.ACEITO),
                      },
                    ],
                  );
                }}
              >
                Aceitar
              </Button>
              <Button
                onPress={() => {
                  Alert.alert(
                    'Confirmação',
                    'Tem certeza que deseja recusar este pedido?',
                    [
                      {
                        text: 'Cancelar',
                        style: 'cancel',
                      },
                      {
                        text: 'Recusar',
                        onPress: () => onSubmit(Status.RECUSADO),
                      },
                    ],
                  );
                }}
                theme="line_strong"
              >
                Recusar
              </Button>
            </>
          )}

          {canChangeStatus && newStatus && (
            <Button
              onPress={() => {
                Alert.alert(
                  'Confirmação',
                  `Tem certeza que deseja alterar o status deste pedido para '${newStatus}'?`,
                  [
                    {
                      text: 'Cancelar',
                      style: 'cancel',
                    },
                    {
                      text: 'Alterar',
                      onPress: () => onSubmit(newStatus),
                    },
                  ],
                );
              }}
            >
              Alterar status
            </Button>
          )}
        </>
      )}
    </FullModal>
  );
};

export default forwardRef(UpdateSale);
